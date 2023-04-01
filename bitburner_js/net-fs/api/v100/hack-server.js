import {reply_port_id,ObjectPort,get_log_port,get_request_port} from "/api/v100/hack-support.js";
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
class ThreadState {
	/** @type {AbortSignal} */
	signal;
	/** @type {number[]} */
	timers=[];
	/** @type {(()=>void)[]} */
	abort_callbacks=[];
	/** @param {AbortSignal} signal */
	constructor(signal) {
		this.signal=signal;
		signal.addEventListener("abort",() => {
			for(let timer of this.timers) {
				clearTimeout(timer);
			}
			for(let cb of this.abort_callbacks) {
				cb();
			}
		});
	}
	/** @arg {number} id */
	remove_timer(id) {
		let idx=this.timers.indexOf(id);
		if(idx===-1) return;
		this.timers.splice(idx,1);
	}
	/** @arg {()=>void} cb */
	remove_abort_callback(cb) {
		let idx=this.abort_callbacks.indexOf(cb);
		if(idx===-1) return;
		this.abort_callbacks.splice(idx,1);
	}
}
/** @param {(state:ThreadState)=>Promise<void>} func */
function start_thread(func) {
	const controller=new AbortController();
	const signal=controller.signal;
	/** @type {ThreadState} */
	const thread_state=new ThreadState(signal);
	let timeout_id=setTimeout(() => {
		thread_state.remove_timer(timeout_id);
		func(thread_state).then(null,(err) => {
			console.log("thread error",err);
		});
	},0);
	thread_state.timers.push(timeout_id);
	return {
		kill() {
			for(let timer of thread_state.timers) {
				clearTimeout(timer);
			}
			controller.abort("thread killed");
		}
	};
}
/** @param {ThreadState} t @param {number} delay */
export function async_sleep(t,delay) {
	if(t.signal.aborted) return Promise.reject(new Error("Aborted"));
	/** @type {Promise<void>} */
	let ret=new Promise((a) => {
		t.abort_callbacks.push(a);
		let id=setTimeout(() => {
			t.remove_abort_callback(a);
			t.remove_timer(id);
			a();
		},delay);
		t.timers.push(id);
	});
	return ret;
}
/** @type {{host:string;msg:any[]}[]} */
let log_messages=[];
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
	const forgotten_ids=new Set;
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
	const request_port=get_request_port(ns);
	/** @type {ObjectPort<ReplyMsgPending>} */
	const reply_port=ObjectPort.getPortHandle(ns,reply_port_id);
	const log_port=get_log_port(ns);
	let thread_handle=start_thread(async function(thread) {
		while(!thread.signal.aborted) {
			await log_port.nextWrite();
			if(log_messages.length>1000) {
				try {
					log_port.read();
				} catch {
					log_port.port.read();
				}
				continue;
			}
			while(!log_port.empty()) {
				let msg=log_port.peek();
				if(msg===null) {
					log_port.read();
					continue;
				}
				log_messages.push(msg);
				log_port.read();
			}
		}
	});
	ns.atExit(() => {
		thread_handle.kill();
	});
	while(!reply_port.empty()) {
		await ns.sleep(100);
		if(reply_port.empty()) break;
		let reply_msg=reply_port.mustPeek();
		if(reply_msg.reply.length===0) break;
	}
	request_port.clear();
	reply_port.clear();
	log_port.clear();
	reply_port.mustWrite({call: "pending",id: "reply",reply: []});
	request_port.mustWrite({call: "pending",id: "call",reply: []});
	let reply_uid_counter=0;
	/** @param {ReplyMsg} msg */
	async function send_reply_msg_2(msg) {
		let reply_msg=reply_port.peek();
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
		reply_port.read();
		let sent=reply_port.tryWrite(pending_reply_message);
		if(!sent) throw new Error("Unable to send queued messages");
	}
	async function process_messages() {
		for(let i=0;;i++) {
			let start_perf=performance.now();
			await ns.sleep(500);
			let msg=request_port.peek();
			let reply=reply_port.peek();
			if(msg===null) continue;
			const msg_arr=msg.reply;
			if(msg_arr.length===0) {
				await ns.sleep(1500);
				continue;
			}
			if(reply) {
				ns.print("send_len ",msg_arr.length," rx_len ",reply.reply.length);
			} else {
				ns.print("send_len ",msg_arr.length);
			}
			for(let msg of msg_arr) {
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
			}
			msg_arr.length=0;
			request_port.read();
			let success=request_port.tryWrite(msg);
			if(!success) throw new Error("Failed (request_port.tryWrite)");
			while(log_messages.length>0) {
				let res=log_messages.shift();
				if(res!==void 0) ns.printf("%s "+res.msg.map(() => "%s").join(" "),res.host,...res.msg);
			}
			let cur_perf=0;
			cur_perf=performance.now();
			let end_perf_diff=cur_perf-start_perf;
			start_perf=cur_perf;
			ns.print("server done ",ns.tFormat(end_perf_diff,true));
			let prev_len=-1,cur_len=-1;
			for(let i=0;;i++) {
				await ns.sleep(33);
				let reply=reply_port.mustPeek();
				let real_prev_len=cur_len;
				prev_len=cur_len;
				cur_len=reply.reply.length;
				reply.reply=reply.reply.filter(v => {
					return !forgotten_ids.has(v.uid);
				});
				if(cur_len!==reply.reply.length) {
					reply_port.mustRead();
					reply_port.write(reply);
					prev_len=real_prev_len;
					cur_len=reply.reply.length;
				}
				if(prev_len!==-1&&prev_len!==cur_len) i=0;
				if(reply.reply.length===0) break;
			}
			cur_perf=performance.now();
			end_perf_diff=cur_perf-start_perf;
			ns.print("clients done ",ns.tFormat(end_perf_diff,true));
		}
	}
	await process_messages();
}
