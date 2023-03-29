export const request_port_id=1;
export const reply_port_id=2;
export const log_port_id=3;
export const reply_retry_port_id=4;
export const max_port_id=5;
/** @param {NetscriptPort} ns_port */
export async function async_port_read_data(ns_port) {
	let data=ns_port.read();
	if(data==="NULL PORT DATA") throw new Error("Invalid message");
	return data;
}
/** @param {NetscriptPort} ns_port */
export async function async_port_peek_data(ns_port) {
	let data=ns_port.peek();
	if(data==="NULL PORT DATA") throw new Error("Invalid message");
	return data;
}
/** @template {{}} T @param {NetscriptPort} ns_port @returns {Promise<T>} */
export async function async_port_peek_msg(ns_port) {
	let data=await async_port_peek_data(ns_port);
	if(typeof data==="number") throw new Error("Invalid message");
	return JSON.parse(data);
}
/** @param {NetscriptPort} ns_port @param {PortData} str */
export async function async_port_write_data(ns_port,str) {
	while(ns_port.full()) throw new Error("Port full");
	let popped=ns_port.write(str);
	if(popped!==null) throw new Error("Unreachable");
}
/** @template {{}} T @param {NetscriptPort} ns_port @returns {Promise<T>} */
export async function async_read_port_msg(ns_port) {
	let data=await async_port_read_data(ns_port);
	if(typeof data==="number") throw new Error("Invalid message");
	return JSON.parse(data);
}
/** @param {NetscriptPort} ns_port @arg {{}} msg */
export function send_port_msg(ns_port,msg) {
	return async_port_write_data(ns_port,JSON.stringify(msg));
}
/** @arg {NetscriptPort} ns_port @arg {CallMsg} msg */
export function send_call_msg(ns_port,msg) {
	return send_port_msg(ns_port,msg);
}
/** @arg {NetscriptPort} ns_port @arg {ReplyMsg} msg */
export function send_reply_msg(ns_port,msg) {
	return send_port_msg(ns_port,msg);
}
/** @param {NetscriptPort} ns_port @returns {Promise<CallMsg>} */
export function read_call_msg(ns_port) {
	return async_read_port_msg(ns_port);
}
/** @param {NetscriptPort} ns_port @returns {Promise<ReplyMsg>} */
export function peek_reply_msg(ns_port) {
	return async_port_peek_msg(ns_port);
}
/** @param {NetscriptPort} ns_port @returns {Promise<ReplyMsg>} */
export function read_reply_msg(ns_port) {
	return async_read_port_msg(ns_port);
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
	const wait_start_perf=performance.now();
	console.log("start:"+call_id+":"+id);
	function perf_diff() {return performance.now()-wait_start_perf;}
	const request_port=this_.ns.getPortHandle(request_port_id);
	const reply_port=this_.ns.getPortHandle(reply_port_id);
	const notify_request_has_space_port=this_.ns.getPortHandle(max_port_id+2);
	const notify_new_reply_port=this_.ns.getPortHandle(max_port_id+4);
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	for(let i=0;i<20;i++) {
		if(request_port.full()) await notify_request_has_space_port.nextWrite();
		await send_call_msg(request_port,{call: call_id,args: [id]});
		for(;;) {
			await notify_new_reply_port.nextWrite();
			if(reply_port.empty()) throw new Error("reply already removed");
			let msg=await peek_reply_msg(reply_port);
			if(!should_accept(msg,call_id,id)) continue;
			reply_port.read();
			let ret=msg.reply;
			const cur_timer=perf_diff();
			console.log("complete",this_.ns.tFormat(cur_timer),this_.hostname,call_id,i);
			assume_return(ret);
			return ret;
		}
	}
	throw new Error("Timeout waiting for response from server (is hack-server.js running?)");
}
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {CallId} call_id */
export async function generic_get_call(this_,call_id) {
	if(!this_.target) throw new Error("Invalid state.target");
	return generic_get_call_with_id(this_,this_.target,call_id);
}
/** @arg {HackState} this_ */
export function getServerMaxMoney_(this_) {
	const call_id="getServerMaxMoney";
	return generic_get_call(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerMinSecurityLevel_(this_) {
	const call_id="getServerMinSecurityLevel";
	return generic_get_call(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerSecurityLevel_(this_) {
	const call_id="getServerSecurityLevel";
	return generic_get_call(this_,call_id);
}
/** @arg {HackState} this_ */
export async function getServerMoneyAvailable_(this_) {
	const call_id="getServerMoneyAvailable";
	return generic_get_call(this_,call_id);
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
