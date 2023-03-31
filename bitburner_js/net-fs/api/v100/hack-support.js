// 2
export const request_port_id=1;
export const reply_port_id=2;
export const log_port_id=3;
export const reply_retry_port_id=4;
export const notify_request_has_space_id=5;
export const notify_complete_pipe_port_id=6;
export const notify_new_reply_port_id=7;
export const notify_dead_reply_id=8;
export const max_port_id=9;
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
let resend_count=0;
/** @type {Map<number,NetscriptPortV2>} */
const known_port_handles=new Map;
/** @arg {NS} ns */
export function fill_port_handle_cache(ns) {
	for(let i=0;i<max_port_id;i++) {
		const port_handle=NetscriptPortV2.getPortHandle(ns,i);
		known_port_handles.set(i,port_handle);
	}
}
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {string} id @arg {CallId} call_id */
export async function generic_get_call_with_id(this_,id,call_id) {
	const {ns}=this_;
	// const wait_start_perf=performance.now();
	// function perf_diff() {return performance.now()-wait_start_perf;}
	/** @type {ObjectPort<CallMsgPending>} */
	const request_port=ObjectPort.getPortHandle(ns,request_port_id);
	/** @type {ObjectPort<ReplyMsgPending>} */
	const reply_port=ObjectPort.getPortHandle(ns,reply_port_id);
	const notify_complete_port=NetscriptPortV2.getPortHandle(ns,notify_complete_pipe_port_id);
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	let notify_complete_arr=[];
	let send_message=true;
	let first_loop=true;
	for(let i=0;;) {
		await ns.sleep(33);
		{
			if(notify_complete_port.full()) continue;
			let last=notify_complete_arr.pop();
			if(last!==void 0) {
				notify_complete_port.write(last);
				continue;
			}
		}
		if(first_loop) first_loop=false;
		if(request_port.empty()) {request_port.mustWrite({call: "pending",id: "call",reply: []}); continue;}
		if(reply_port.empty()) {reply_port.mustWrite({call: "pending",id: "reply",reply: []}); continue;}
		if(send_message) {
			let cur_msg=request_port.mustRead();
			cur_msg.reply.push({call: call_id,args: [id]});
			request_port.mustWrite(cur_msg);
			send_message=false;
		}
		await reply_port.nextWrite();
		let pending_msg=reply_port.mustPeek();
		let accepted_messages=[];
		if(pending_msg.reply.length===0) continue;
		if(i%64+2===64) {
			resend_count++;
			ns.print("resend ",resend_count," ",i);
			send_message=true;
			i++;
			continue;
		}
		let received_reply=false;
		for(let msg of pending_msg.reply) {
			if(!should_accept(msg,call_id,id)) continue;
			accepted_messages.push(msg);
			notify_complete_arr.push(msg.uid);
			received_reply=true;
		}
		for(let msg of pending_msg.reply.slice()) {
			if(!should_accept(msg,call_id,id)) continue;
			let idx=pending_msg.reply.indexOf(msg);
			if(idx===-1) continue;
			pending_msg.reply.splice(idx,1);
		}
		if(received_reply) {
			debugger;
			reply_port.mustRead();
			reply_port.mustWrite(pending_msg);
		}
		for(let ok_msg of accepted_messages) {
			let ret=ok_msg.reply;
			assume_return(ret);
			return ret;
		}
		i++;
	}
}
/** @type {Map<string,number>} */
const memoized_number=new Map;
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {CallId} call_id */
export function generic_get_call(this_,call_id) {
	if(!this_.target) throw new Error("Invalid state.target");
	return generic_get_call_with_id(this_,this_.target,call_id);
}
/** @arg {HackState} this_ @arg {Extract<ReplyMsg,{reply:number}>["call"]} call_id */
async function memoed_get_call_ret_number(this_,call_id) {
	let prev_ret=memoized_number.get(call_id);
	if(prev_ret!==void 0) {
		fill_port_handle_cache(this_.ns);
		(async () => {
			let updated_ret=await generic_get_call(this_,call_id);
			memoized_number.set(call_id,updated_ret);
		})();
		await this_.ns.sleep(10);
		return prev_ret;
	}
	let memoized_ret=await generic_get_call(this_,call_id);
	memoized_number.set(call_id,memoized_ret);
	return memoized_ret;

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
		if(res==="NULL PORT DATA") return null;
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
		if(last===null) return null;
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
		return this.port.nextWrite();
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
	/** @template {{}} T @param {NS} ns @param {number} port_id @returns {ObjectPort<T>} */
	static getPortHandle(ns,port_id) {
		let str_port=StringPort.getPortHandle(ns,port_id);
		return new ObjectPort(str_port);
	}
}
