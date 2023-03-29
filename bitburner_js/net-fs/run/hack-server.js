import {notify_complete_pipe_port_id,log_port_id,read_call_msg,read_reply_msg,reply_port_id,request_port_id,send_reply_msg,notify_request_has_space_id,notify_new_reply_port_id} from "/run/hack-support.js";
/**
 * @param {number} min
 * @param {number} max
 */
function rand_num(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}
/** @param {NS} ns */
export async function main(ns) {
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

	const width=250+120;
	ns.resizeTail(width,120);
	ns.moveTail(window_width-width-4,1);

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
	request_port.clear();
	reply_port.clear();
	log_port.clear();
	const notify_complete_port=ns.getPortHandle(notify_complete_pipe_port_id);
	notify_complete_port.clear();
	const notify_request_has_space_port=ns.getPortHandle(notify_request_has_space_id);
	notify_request_has_space_port.clear();
	notify_request_has_space_port.write(1);
	const notify_new_reply_port=ns.getPortHandle(notify_new_reply_port_id);
	notify_new_reply_port.clear();
	let reply_uid_counter=0;
	/** @param {ReplyMsg} msg */
	async function send_reply_msg_2(msg) {
		/** @type {ReplyMsgPending} */
		let pending_reply_message={call: "pending",id: "reply",reply: []};
		while(!reply_port.empty()) {
			let reply_msg=await read_reply_msg(reply_port);
			if(!reply_msg) continue;
			pending_reply_message.reply.push(...reply_msg.reply);
		}
		let reply_id=reply_uid_counter;
		reply_uid_counter++;
		msg.uid=reply_id;
		let pending_msg_count=0;
		/** @type {(ReplyMsg|null)[]} */
		const reply_cache=pending_reply_message.reply.slice();
		for(let done_id of complete_reply_id_list) {
			const idx=pending_reply_message.reply.findIndex(v => v.uid===done_id);
			if(idx===-1) {
				pending_msg_count++;
				continue;
			}
			reply_cache[idx]=null;
		}
		for(let i=0;i<reply_cache.length;i++) {
			if(reply_cache[i]===null) {
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
		console.log("reply cache",reply_cache);
		console.log("waiting replies",pending_msg_count);
		notify_new_reply_port.write(1);
		let sent=await send_reply_msg(reply_port,pending_reply_message);
		if(!sent) throw new Error("Unable to send queued messages");
	}
	async function process_messages() {
		for(let i=0;;i++) {
			while(request_port.empty()) await request_port.nextWrite();
			let msg=await read_call_msg(request_port);
			const msg_arr=msg.reply;
			for(let msg of msg_arr) {
				const {call,args}=msg;
				switch(call) {
					case "getServerMaxMoney": {
						let reply=ns.getServerMaxMoney(...args);
						await send_reply_msg_2({call,id: args[0],uid: -1,reply});
					} break;
					case "getServerMinSecurityLevel": {
						let reply=ns.getServerMinSecurityLevel(...args);
						await send_reply_msg_2({call,id: args[0],uid: -1,reply});
					} break;
					case "getServerMoneyAvailable": {
						let reply=ns.getServerMoneyAvailable(...args);
						await send_reply_msg_2({call,id: args[0],uid: -1,reply});
					} break;
					case "getServerSecurityLevel": {
						let reply=ns.getServerSecurityLevel(...args);
						await send_reply_msg_2({call,id: args[0],uid: -1,reply});
					} break;
					case "get_server": {
						let reply=get_server(args[0]);
						await send_reply_msg_2({call,id: args[0],uid: -1,reply});
					} break;
					case "get_hack_target": {
						if(randomize_hack) {
							let reply=null;
							for(let i=0;;i++) {
								if(i>64) {await ns.sleep(1); i=0;}
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
								if(srv.hasAdminRights) {
									reply=srv;
									break;
								}
							}
							await send_reply_msg_2({call,id: args[0],uid: -1,reply});
						} else {
							let srv;
							for(let name of ["ecorp","foodnstuff","n00dles"]) {
								srv=get_server(name);
								if(srv.hasAdminRights) break;
								if(srv.openPortCount<srv.numOpenPortsRequired) continue;
								ns.nuke(name);
							}
							if(!srv) srv=get_server("n00dles");
							await send_reply_msg_2({call,id: args[0],uid: -1,reply: srv});
						}
					} break;
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
			while(!log_port.empty()) {
				let res=log_port.read();
				ns.printf("%s",res);
			}
		}
	}
	await process_messages();
}
