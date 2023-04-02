import {get_log_port,get_request_port,get_reply_port} from "/api/v100/hack-support.js";
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
	const request_port=get_request_port(ns);
	const reply_port=get_reply_port(ns);
	const log_port=get_log_port(ns);
	let thread_handle=start_thread(async function(thread) {
		while(!thread.signal.aborted) {
			await log_port.nextWrite();
			while(!log_port.empty()) {
				if(log_messages.length>1000) {
					log_port.read();
					continue;
				}
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
	if(request_port.empty()) request_port.mustWrite({call: "pending",uid: -1,id: "call",reply: []});
	if(reply_port.empty()) reply_port.mustWrite({call: "pending",uid: -1,id: "reply",reply: []});
	let reply_uid_counter=0;
	let reply_msg=reply_port.peek();
	if(reply_msg) {
		reply_uid_counter=reply_msg.uid+1;
	}
	reply_uid_counter++;
	reply_msg=reply_port.mustRead();
	reply_msg.uid=reply_uid_counter;
	reply_port.mustWrite(reply_msg);
	/** @param {ReplyMsg} msg */
	async function send_reply_msg_2(msg) {
		const reply_msg=reply_port.mustRead();
		msg.uid=reply_uid_counter;
		reply_uid_counter++;
		if(reply_uid_counter>0xffff) reply_uid_counter=0;
		reply_msg.uid=reply_uid_counter;
		reply_msg.reply.push(msg);
		reply_port.mustWrite(reply_msg);
	}
	/**
	 * @returns {{t: "n"}|{t:"s";l:"Server";f:Extract<ReplyMsg,{reply:Server}>["call"];a:string;v:Server}|{t:"s";l:"number";f: Extract<ReplyMsg,{reply:number}>["call"];a:string;v:number}}
	 * @param {NS} ns
	 * @param {CallMsg} msg
	 * @param {any[][]} messages
	 */
	function process_one_message(ns,msg,messages) {
		const {call,args}=msg;
		switch(call) {
			default: return {t: "n"};
			case "getServerMaxMoney":
			case "getServerMinSecurityLevel":
			case "getServerMoneyAvailable":
			case "getServerSecurityLevel": return {t: "s",l: "number",f: call,a: args[0],v: ns[call](...args)};
			case "get_server": return {t: "s",l: "Server",f: call,a: args[0],v: get_server(args[0])};
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
							if(scan_results.length>0) {
								messages.push(["scan",hostname,...scan_results]);
							}
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
					return {t: "s",l: "Server",f: call,a: args[0],v};
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
					return {t: "s",l: "Server",f: call,a: args[0],v: srv};
				}
			}
		}
	}
	async function process_messages() {
		let server_cycles=0;
		for(let i=0;;i++) {
			server_cycles++;
			/** @type {[string,...any[]][]} */
			const messages=[];
			const start_perf=performance.now();
			await ns.sleep(800);
			const msg=request_port.peek();
			const reply=reply_port.peek();
			if(msg===null) continue;
			const msg_arr=msg.reply;
			if(msg_arr.length===0) continue;
			const has_request=msg_arr.length>0,has_reply=reply&&reply.reply.length>0;
			if(msg_arr.length>0) messages.push(["send_len",msg_arr.length]);
			if(reply&&reply.reply.length>0) messages.push(["rx_len",reply.reply.length]);
			for(const msg of msg_arr) {
				const reply=process_one_message(ns,msg,messages);
				if(reply.t==="s"&&reply.l==="number") {
					const {f: call,a: id,v}=reply;
					await send_reply_msg_2({call,id,uid: -1,reply: v});
				}
				if(reply.t==="s"&&reply.l==="Server") {
					const {f: call,a: id,v}=reply;
					await send_reply_msg_2({call,id,uid: -1,reply: v});
				}
			}
			msg_arr.length=0;
			request_port.read();
			let success=request_port.tryWrite(msg);
			if(!success) throw new Error("Failed (request_port.tryWrite)");
			if(log_messages.length>0) {
				log_messages.forEach(res => {
					messages.push(["log",res.host,...res.msg]);
				});
			}
			let cur_perf=performance.now();
			let server_work_time=cur_perf-start_perf;
			if(has_request||has_reply) {
				ns.printf(
					"[%s](%s) messages: %s",
					ns.tFormat(server_work_time,true),server_cycles,
					JSON.stringify(messages).slice(1,-1)
				);
				server_cycles=0;
			}
		}
	}
	await process_messages();
}
