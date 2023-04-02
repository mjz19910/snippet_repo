const request_port_id=1;
const reply_port_id=2;
const log_port_id=3;
const max_port_id=4;
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function async_port_read_data(ns,ns_port) {
	await ns.sleep(33);
	let data=ns_port.read();
	if(data==="NULL PORT DATA") return null;
	return data;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function async_port_peek_data(ns,ns_port) {
	await ns.sleep(33);
	let data=ns_port.peek();
	if(data==="NULL PORT DATA") return null;
	return data;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function async_port_peek_msg(ns,ns_port) {
	let data=await async_port_peek_data(ns,ns_port);
	if(data===null) return null;
	if(typeof data==="number") return null;
	/** @type {ReplyMsgPending|CallMsgPending} */
	let pending_msg=JSON.parse(data);
	if(pending_msg.call!=="pending") return null;
	return pending_msg;
}
/** @param {NS} ns @param {NetscriptPort} ns_port @param {PortData} str */
export async function async_port_write_data(ns,ns_port,str) {
	await ns.sleep(33);
	if(ns_port.full()) return false;
	let popped=ns_port.write(str);
	if(popped!==null) throw new Error("Unreachable");
	return true;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function async_read_port_msg(ns,ns_port) {
	let data=await async_port_read_data(ns,ns_port);
	if(data===null) return null;
	if(typeof data==="number") return null;
	/** @type {CallMsgPending|ReplyMsgPending} */
	let msg=JSON.parse(data);
	if(msg.call!=="pending") return null;
	return msg;
}
/** @param {NS} ns @param {NetscriptPort} ns_port @arg {CallMsgPending|ReplyMsgPending} msg */
export function send_port_msg(ns,ns_port,msg) {
	return async_port_write_data(ns,ns_port,JSON.stringify(msg));
}
/** @param {NS} ns @arg {NetscriptPort} ns_port @arg {CallMsgPending} msg */
export function send_call_msg(ns,ns_port,msg) {
	return send_port_msg(ns,ns_port,msg);
}
/** @param {NS} ns @arg {NetscriptPort} ns_port @arg {ReplyMsgPending} msg */
export function send_reply_msg(ns,ns_port,msg) {
	return send_port_msg(ns,ns_port,msg);
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function read_call_msg(ns,ns_port) {
	let msg=await async_read_port_msg(ns,ns_port);
	if(msg===null) return null;
	if(msg.id==="call") return msg;
	return null;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function peek_call_msg(ns,ns_port) {
	let msg=await async_port_peek_msg(ns,ns_port);
	if(msg===null) return null;
	if(msg.id==="call") return msg;
	return null;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function peek_reply_msg(ns,ns_port) {
	let msg=await async_port_peek_msg(ns,ns_port);
	if(msg===null) return null;
	if(msg.id==="reply") return msg;
	return null;
}
/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function read_reply_msg(ns,ns_port) {
	let msg=await async_read_port_msg(ns,ns_port);
	if(msg===null) return null;
	if(msg.id==="reply") return msg;
	return null;
}
/**
 * @template {string} CallId
 * @param {ReplyMsg} reply
 * @param {CallId} type
 * @param {string} id
 * @returns {reply is {call:CallId}}
 */
function should_accept(reply,type,id) {
	if(reply.call!==type) return false;
	if("hostname" in reply) return reply.hostname===id;
	if("id" in reply) return reply.id===id;
	throw new Error("Unsupported should accept");
}
/** @type {Map<number,NetscriptPortV2>} */
const known_port_handles=new Map;
/** @arg {NS} ns */
export function fill_port_handle_cache(ns) {
	for(let i=1;i<max_port_id;i++) {
		const port_handle=NetscriptPortV2.getPortHandle(ns,i);
		known_port_handles.set(i,port_handle);
	}
}
export let netscript_lock={
	locked: false,
	/** @type {(()=>void)[]} */
	waiters: [],
	async lock() {
		if(this.locked) {
			console.log("lock.wait()");
			await this.wait();
			console.log("lock.unlocked()");
		}
		this.locked=true;
	},
	unlock() {
		this.locked=false;
		let last=this.waiters.pop();
		if(last!==void 0) last();
	},
	async wait() {
		if(this.locked) {
			let {waiters}=this;
			/** @type {Promise<void>} */
			let waiter=new Promise(function(a) {
				waiters.push(a);
			});
			await waiter;
		}
	},
	/** @arg {()=>Promise<void>} callback */
	async critical(callback) {
		await this.lock();
		await callback();
		this.unlock();
	}
};
/** @arg {NS} ns */
export function get_log_port(ns) {
	/** @type {ObjectPort<{host:string;msg:any[]}>} */
	const log_port=ObjectPort.getPortHandle(ns,log_port_id);
	return log_port;
}
/** @arg {NS} ns */
export function get_request_port(ns) {
	/** @type {ObjectPort<CallMsgPending>} */
	const request_port=ObjectPort.getPortHandle(ns,request_port_id);
	return request_port;
}
/** @arg {NS} ns */
export function get_reply_port(ns) {
	/** @type {ObjectPort<ReplyMsgPending>} */
	const reply_port=ObjectPort.getPortHandle(ns,reply_port_id);
	return reply_port;
}
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {string} id @arg {CallId} call_id */
export async function generic_get_call_with_id(this_,id,call_id) {
	const {ns,request_port,reply_port}=this_;
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	let send_message=true;
	let first_loop=true;
	for(;;) {
		await ns.asleep(800);
		if(first_loop) first_loop=false;
		if(send_message) {
			let cur_msg=request_port.mustRead();
			cur_msg.reply.push({call: call_id,args: [id]});
			request_port.mustWrite(cur_msg);
			await reply_port.nextWrite();
			send_message=false;
		}
		let pending_msg=reply_port.mustPeek();
		let accepted_messages=[];
		if(pending_msg.reply.length===0) continue;
		let received_reply=false;
		for(let msg of pending_msg.reply.slice()) {
			if(!should_accept(msg,call_id,id)) continue;
			accepted_messages.push(msg);
			received_reply=true;
			let idx=pending_msg.reply.indexOf(msg);
			if(idx===-1) throw new Error("Not found");
			pending_msg.reply.splice(idx,1);
		}
		if(received_reply) {
			reply_port.mustRead();
			reply_port.mustWrite(pending_msg);
		}
		for(let ok_msg of accepted_messages) {
			let ret=ok_msg.reply;
			assume_return(ret);
			return ret;
		}
	}
}
/** @type {Map<string,{t:"r",v:number}|{t:"e",err:unknown}>} */
const memoized_number=new Map;
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {CallId} call_id */
export function generic_get_call(this_,call_id) {
	if(!this_.target) throw new Error("Invalid state.target");
	return generic_get_call_with_id(this_,this_.target,call_id);
}
/** @arg {HackState} this_ @arg {Extract<ReplyMsg,{reply:number}>["call"]} call_id */
function memoed_get_call_ret_number(this_,call_id) {
	let prev_ret=memoized_number.get(call_id);
	if(prev_ret!==void 0) {
		fill_port_handle_cache(this_.ns);
		(async () => {
			try {
				let ret=await generic_get_call(this_,call_id);
				return ret;
			} catch(e) {
				debugger;
				throw e;
			}
		})().then(v => {
			memoized_number.set(call_id,{t: "r",v});
		}).catch(err => {
			memoized_number.set(call_id,{t: "e",err});
		});
		if(prev_ret.t==="r") {
			return prev_ret.v;
		} else {
			throw prev_ret.err;
		}
	}
	return generic_get_call(this_,call_id).then(v => {
		memoized_number.set(call_id,{t: "r",v});
		return v;
	}).catch(err => {
		memoized_number.set(call_id,{t: "e",err});
		throw err;
	});

}
/** @arg {HackState} this_ */
export function getServerMaxMoney_(this_) {
	const call_id="getServerMaxMoney";
	return memoed_get_call_ret_number(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerMinSecurityLevel_(this_) {
	const call_id="getServerMinSecurityLevel";
	return memoed_get_call_ret_number(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerSecurityLevel_(this_) {
	const call_id="getServerSecurityLevel";
	return memoed_get_call_ret_number(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerMoneyAvailable_(this_) {
	const call_id="getServerMoneyAvailable";
	return memoed_get_call_ret_number(this_,call_id);
}

export class HackState {
	first=true;
	/** @type {string|null} */
	target=null;
	/** @arg {NS} ns @arg {{_:[thread_count:number,hostname:string]}} p_flags */
	constructor(ns,p_flags) {
		this.ns=ns;
		const [thread_count,hostname]=p_flags._;
		this.thread_count=thread_count;
		this.hostname=hostname;
		this.request_port=get_request_port(ns);
		this.reply_port=get_reply_port(ns);
		this.log_port=get_log_port(ns);
	}
}
export class NetscriptPortV2 {
	/** @arg {NetscriptPort} port */
	constructor(port) {
		this.port=port;
	}
	read() {
		let res=this.port.read();
		if(res==="NULL PORT DATA") return null;
		return res;
	}
	peek() {
		let res=this.port.peek();
		if(res==="NULL PORT DATA") return null;
		return res;
	}
	/** @arg {string|number} data */
	write(data) {
		return this.port.write(data);
	}
	/** @arg {string|number} data */
	tryWrite(data) {
		return this.port.tryWrite(data);
	}
	empty() {
		return this.port.empty();
	}
	clear() {
		this.port.clear();
	}
	full() {
		return this.port.full();
	}
	nextWrite() {
		return this.port.nextWrite();
	}
	/** @arg {string|number} data */
	mustWrite(data) {
		let success=this.tryWrite(data);
		if(!success) throw new Error("must failed");
	}
	/** @param {NS} ns @param {number} port_id */
	static getPortHandle(ns,port_id) {
		let handle_cache=known_port_handles.get(port_id);
		if(handle_cache!==void 0) {
			return new this(handle_cache.port);
		}
		let handle=ns.getPortHandle(port_id);
		let ret=new this(handle);
		known_port_handles.set(port_id,ret);
		return ret;
	}
}
export class StringPort {
	/** @arg {NetscriptPortV2} port */
	constructor(port) {
		this.port=port;
	}
	read() {
		let res=this.port.read();
		if(typeof res==="number") throw new Error("Invalid message");
		return res;
	}
	peek() {
		let res=this.port.peek();
		if(typeof res==="number") throw new Error("Invalid message");
		return res;
	}
	/** @arg {string} str */
	write(str) {
		let last=this.port.write(str);
		if(typeof last==="number") throw new Error("Invalid message");
		return last;
	}
	/** @arg {string} str */
	tryWrite(str) {
		return this.port.tryWrite(str);
	}
	empty() {
		return this.port.empty();
	}
	clear() {
		this.port.clear();
	}
	full() {
		return this.port.full();
	}
	nextWrite() {
		return this.port.nextWrite();
	}
	/** @param {NS} ns @param {number} port_id @returns {StringPort} */
	static getPortHandle(ns,port_id) {
		let handle=NetscriptPortV2.getPortHandle(ns,port_id);
		return new StringPort(handle);
	}
}
/** @template {{}} T */
export class ObjectPort {
	/** @template {{}} T @param {NS} ns @param {number} port_id @returns {ObjectPort<T>} */
	static getPortHandle(ns,port_id) {
		let str_port=StringPort.getPortHandle(ns,port_id);
		return new ObjectPort(str_port);
	}
	/** @arg {StringPort} port */
	constructor(port) {
		this.port=port;
	}
	empty() {
		return this.port.empty();
	}
	clear() {
		this.port.clear();
	}
	full() {
		return this.port.full();
	}
	nextWrite() {
		return Promise.race([this.port.nextWrite(),new Promise(a => setTimeout(a,1000))]);
	}
	/** @returns {T|null} */
	read() {
		let res=this.port.read();
		if(res===null) return null;
		let ret=JSON.parse(res);
		return ret;
	}
	/** @arg {T} obj */
	write(obj) {
		let str=JSON.stringify(obj);
		let last=this.port.write(str);
		if(last===null) return null;
		/** @type {T} */
		let last_obj=JSON.parse(last);
		return last_obj;
	}
	/** @arg {T} obj */
	tryWrite(obj) {
		let str=JSON.stringify(obj);
		return this.port.tryWrite(str);
	}
	/** @returns {T|null} */
	peek() {
		let res=this.port.peek();
		if(res===null) return null;
		let ret=JSON.parse(res);
		return ret;
	}
	/** @arg {T} obj */
	mustWrite(obj) {
		let success=this.tryWrite(obj);
		if(!success) throw new Error("must failed");
	}
	/** @arg {NS} ns @arg {T} obj */
	async asyncWrite(ns,obj) {
		for(;;) {
			let success=this.tryWrite(obj);
			if(success) break;
			await ns.asleep(0);
		}
	}
	mustRead() {
		let out=this.read();
		if(out===null) throw new Error("must failed");
		return out;
	}
	mustPeek() {
		let out=this.peek();
		if(out===null) throw new Error("must failed");
		return out;
	}
	peekAll() {
		let acc_arr=[];
		while(!this.empty()) {
			let cur=this.mustRead();
			acc_arr.push(cur);
		}
		for(let msg of acc_arr) {
			this.mustWrite(msg);
		}
		return acc_arr;
	}
}
/** @arg {NS} ns */
export function support_disable_log_opts(ns) {
	ns.disableLog("asleep");
}