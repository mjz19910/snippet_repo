import {notify_complete_pipe_port_id,log_port_id,reply_port_id,request_port_id,send_reply_msg,notify_request_has_space_id,peek_call_msg,send_call_msg,peek_reply_msg,read_reply_msg} from "/api/v100/hack-support.js";
/**
 * @param {number} min
 * @param {number} max
 */
function rand_num(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}
/** @param {NS} ns */
function serve_functions_list(ns) {
	ns.getServerMinSecurityLevel;
	ns.getServerMoneyAvailable;
	ns.getServerSecurityLevel;
	ns.getServerMaxMoney;
}
/** @param {NS} ns */
export async function main(ns) {
	serve_functions_list(ns);
	ns.tail();
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("sleep");
	ns.disableLog("scan");
	const window_width=globalThis["document"].body.getClientRects()[0].width;
	await ns.sleep(33);
	x: {
		if(ns.args.length===0) break x;
		if(ns.args.includes("--no-size")) break x;
		const width=250+120;
		ns.resizeTail(width,120);
		ns.moveTail(window_width-width-4,1);
	}
	const randomize_hack=true;
	/** @type {{[x:string]:Server}} */
	const server_map={};
	const scanned_server_map=new Set;
	/** @type {string[]} */
	const hostname_list=[];
	/** @arg {string} hostname */
	function get_server(hostname) {
		let server=server_map[hostname];
		if(server) return server;
		hostname_list.push(hostname);
		server=ns.getServer(hostname);
		server_map[hostname]=server;
		return server;
	}
	for(let item of ns.scan("home")) get_server(item);
	/** @type {number[]} */
	let complete_reply_id_list=[];
	const request_port=ns.getPortHandle(request_port_id);
	const reply_port=ns.getPortHandle(reply_port_id);
	const log_port=ns.getPortHandle(log_port_id);
	let wait_count=0;
	while(!reply_port.empty()) {
		wait_count++;
		await ns.sleep(33);
		if(wait_count>20) {
			ns.print("cleared reply port");
			reply_port.clear();
			break;
		}
		if(reply_port.empty()) break;
		let reply_msg=await peek_reply_msg(ns,reply_port);
		// invalid state: the reply port is not empty.
		if(reply_msg===null) throw new Error("Invalid state");
		if(reply_msg?.reply.length===0) break;
		ns.print("reply_len ",reply_msg.reply.length);
	}
	request_port.clear();
	reply_port.clear();
	log_port.clear();
	await send_reply_msg(ns,reply_port,{call: "pending",id: "reply",reply: []});
	const notify_complete_port=ns.getPortHandle(notify_complete_pipe_port_id);
	notify_complete_port.clear();
	const notify_request_has_space_port=ns.getPortHandle(notify_request_has_space_id);
	notify_request_has_space_port.clear();
	notify_request_has_space_port.write(1);
	let reply_uid_counter=0;
	/** @param {ReplyMsg} msg */
	async function send_reply_msg_2(msg) {
		let reply_msg=await peek_reply_msg(ns,reply_port);
		if(reply_msg===null) throw new Error("No pending reply");
		let pending_reply_message=reply_msg;
		let reply_id=reply_uid_counter;
		reply_uid_counter++;
		msg.uid=reply_id;
		/** @type {(ReplyMsg|null)[]} */
		const reply_cache=pending_reply_message.reply.slice();
		for(let done_id of complete_reply_id_list) {
			const idx=pending_reply_message.reply.findIndex(v => v.uid===done_id);
			if(idx===-1) continue;
			reply_cache[idx]=null;
		}
		for(let i=0;i<reply_cache.length;i++) {
			let reply_val=reply_cache[i];
			if(reply_val===null) {
				reply_cache.splice(i,1);
				i--;
				continue;
			}
			let removed=pending_reply_message.reply.shift();
			reply_uid_counter++;
			if(!removed) continue;
			let idx=complete_reply_id_list.indexOf(removed.uid);
			if(idx===-1) continue;
			complete_reply_id_list.splice(idx,1);
		}
		pending_reply_message.reply.length=0;
		for(let item of reply_cache) {
			if(item===null) continue;
			pending_reply_message.reply.push(item);
		}
		pending_reply_message.reply.push(msg);
		await read_reply_msg(ns,reply_port);
		let sent=await send_reply_msg(ns,reply_port,pending_reply_message);
		if(!sent) throw new Error("Unable to send queued messages");
	}
	async function process_messages() {
		for(let i=0;;i++) {
			let start_perf=performance.now();
			await ns.sleep(33);
			while(request_port.empty()) await request_port.nextWrite();
			let msg=await peek_call_msg(ns,request_port);
			let reply=await peek_reply_msg(ns,reply_port);
			if(msg===null) continue;
			const msg_arr=msg.reply;
			if(msg_arr.length===0) {
				await ns.sleep(100);
				continue;
			}
			if(reply) {
				ns.print("send_len ",msg_arr.length," rx_len ",reply.reply.length);
			} else {
				ns.print("send_len ",msg_arr.length);
			}
			for(let msg of msg_arr) {
				await ns.sleep(33);
				const {call,args}=msg;
				/** @type {{t:"n"}|{t:"s",l:"Server",f:Extract<ReplyMsg,{reply:Server}>["call"],v:Server}|{t:"s",l:"number",f:Extract<ReplyMsg,{reply:number}>["call"],v:number}} */
				let reply={t: "n"};
				switch(call) {
					case "getServerMaxMoney":
					case "getServerMinSecurityLevel":
					case "getServerMoneyAvailable":
					case "getServerSecurityLevel": reply={t: "s",l: "number",f: call,v: ns[call](...args)}; break;
					case "get_server": reply={t: "s",l: "Server",f: call,v: get_server(args[0])}; break;
					case "get_hack_target": {
						const player=ns.getPlayer();
						if(randomize_hack) {
							let v=null;
							for(let i=0;i<hostname_list.length;i++) {
								let hostname=hostname_list[rand_num(0,(hostname_list.length-1))];
								if(hostname==="home") continue;
								if(hostname.startsWith("big-")) continue;
								if(!scanned_server_map.has(hostname)) {
									scanned_server_map.add(hostname);
									const scan_results=ns.scan(hostname).filter(v => !hostname_list.includes(v));
									if(scan_results.length>0) ns.printf("scan: %s %s",hostname,JSON.stringify(scan_results));
									for(let item of scan_results) get_server(item);
								}
								let srv=get_server(hostname);
								if(srv.purchasedByPlayer) continue;
								if(srv.moneyMax===0) continue;
								if(srv.maxRam===0) continue;
								if(srv.requiredHackingSkill>player.skills.hacking) continue;
								if(srv.hasAdminRights) {
									v=srv;
									break;
								}
							}
							if(v===null) v=get_server("n00dles");
							reply={t: "s",l: "Server",f: call,v};
						} else {
							let srv;
							for(let name of ["ecorp","foodnstuff","n00dles"]) {
								srv=get_server(name);
								if(srv.hasAdminRights) break;
								if(srv.openPortCount<srv.numOpenPortsRequired) continue;
								ns.nuke(name);
								if(srv.requiredHackingSkill>player.skills.hacking) continue;
							}
							if(!srv) srv=get_server("n00dles");
							reply={t: "s",l: "Server",f: call,v: srv};
						}
					} break;
				}
				if(reply.t==="s"&&reply.l==="number") {
					await send_reply_msg_2({call: reply.f,id: args[0],uid: -1,reply: reply.v});
				}
				if(reply.t==="s"&&reply.l==="Server") {
					await send_reply_msg_2({call: reply.f,id: args[0],uid: -1,reply: reply.v});
				}
				notify_request_has_space_port.write(1);
				while(!notify_complete_port.empty()) {
					let complete_id=notify_complete_port.read();
					if(typeof complete_id==="number") {
						if(complete_reply_id_list.includes(complete_id)) continue;
						complete_reply_id_list.push(complete_id);
					}
					else ns.tprint("ERROR complete message not a number");
				}
			}
			msg_arr.length=0;
			request_port.read();
			await send_call_msg(ns,request_port,msg);
			if(!log_port.empty()) {
				let res=log_port.read();
				ns.printf("%s",res);
				continue;
			}
			let cur_perf=0;
			cur_perf=performance.now();
			let end_perf_diff=cur_perf-start_perf;
			start_perf=cur_perf;
			ns.print("done processing all messages in ",ns.tFormat(end_perf_diff));
			for(let i=0;;i++) {
				await ns.sleep(33);
				let reply=await peek_reply_msg(ns,reply_port);
				if(reply?.reply.length===0) break;
				if(i>12) {
					ns.print("replies lost: ",reply?.reply.length," messages");
					break;
				}
			}
			cur_perf=performance.now();
			end_perf_diff=cur_perf-start_perf;
			ns.print("clients done processing replies in ",ns.tFormat(end_perf_diff));
		}
	}
	await process_messages();
}
