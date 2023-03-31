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
 * @param {CallId} call_
 * @param {string} arg0
 * @returns {reply is {call:CallId}}
 */
function should_accept(reply,call_,arg0) {
	if(reply.call!==call_) return false;
	if("hostname" in reply) return reply.hostname===arg0;
	if("id" in reply) return reply.id===arg0;
	throw new Error("Unsupported should accept");
}
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {string} id @arg {CallId} call_id */
export async function generic_get_call_with_id(this_,id,call_id) {
	const {ns}=this_;
	// const wait_start_perf=performance.now();
	// function perf_diff() {return performance.now()-wait_start_perf;}
	const request_port=ns.getPortHandle(request_port_id);
	const reply_port=ns.getPortHandle(reply_port_id);
	const notify_complete_port=ns.getPortHandle(notify_complete_pipe_port_id);
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	let notify_complete_arr=[];
	let send_message=true;
	let first_loop=true;
	for(;;) {
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
		if(request_port.empty()) {await send_call_msg(ns,request_port,{call: "pending",id: "call",reply: []}); continue;}
		if(reply_port.empty()) {await send_reply_msg(ns,reply_port,{call: "pending",id: "reply",reply: []}); continue;}
		if(send_message) {
			let cur_msg=await read_call_msg(ns,request_port);
			if(cur_msg===null) continue;
			cur_msg.reply.push({call: call_id,args: [id]});
			let sent=await send_call_msg(ns,request_port,cur_msg);
			if(!sent) continue;
			send_message=false;
		}
		let pending_msg=await peek_reply_msg(ns,reply_port);
		if(!pending_msg) continue;
		let accepted_messages=[];
		if(pending_msg.reply.length===0) {
			send_message=true;
			continue;
		}
		for(let msg of pending_msg.reply) {
			if(!should_accept(msg,call_id,id)) continue;
			accepted_messages.push(msg);
			notify_complete_arr.push(msg.uid);
		}
		for(let ok_msg of accepted_messages) {
			let ret=ok_msg.reply;
			assume_return(ret);
			return ret;
		}
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
	if(prev_ret!==void 0) return prev_ret;
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
