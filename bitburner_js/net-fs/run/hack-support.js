export const request_port_id=1;
export const reply_port_id=2;
export const log_port_id=3;
export const reply_retry_port_id=4;
export const notify_request_has_space_id=5;
export const notify_complete_pipe_port_id=6;
export const notify_new_reply_port_id=7;
export const max_port_id=8;
/** @param {NetscriptPort} ns_port */
export function async_port_read_data(ns_port) {
	let data=ns_port.read();
	if(data==="NULL PORT DATA") throw new Error("Invalid message");
	return data;
}
/** @param {NetscriptPort} ns_port */
export function async_port_peek_data(ns_port) {
	let data=ns_port.peek();
	if(data==="NULL PORT DATA") throw new Error("Invalid message");
	return data;
}
/** @param {NetscriptPort} ns_port @returns {ReplyMsgPending|CallMsgPending} */
export function async_port_peek_msg(ns_port) {
	let data=async_port_peek_data(ns_port);
	if(typeof data==="number") throw new Error("Invalid message");
	/** @type {ReplyMsgPending|CallMsgPending} */
	let pending_msg=JSON.parse(data);
	if(pending_msg.call!=="pending") throw new Error("Invalid message");
	return pending_msg;
}
/** @param {NetscriptPort} ns_port @param {PortData} str */
export function async_port_write_data(ns_port,str) {
	if(ns_port.full()) return false;
	let popped=ns_port.write(str);
	if(popped!==null) throw new Error("Unreachable");
	return true;
}
/** @param {NetscriptPort} ns_port @returns {CallMsgPending|ReplyMsgPending} */
export function async_read_port_msg(ns_port) {
	let data=async_port_read_data(ns_port);
	if(typeof data==="number") throw new Error("Invalid message");
	/** @type {CallMsgPending|ReplyMsgPending} */
	let msg=JSON.parse(data);
	if(msg.call!=="pending") throw new Error("Invalid message");
	return msg;
}
/** @param {NetscriptPort} ns_port @arg {CallMsgPending|ReplyMsgPending} msg */
export function send_port_msg(ns_port,msg) {
	return async_port_write_data(ns_port,JSON.stringify(msg));
}
/** @arg {NetscriptPort} ns_port @arg {CallMsgPending} msg */
export function send_call_msg(ns_port,msg) {
	return send_port_msg(ns_port,msg);
}
/** @arg {NetscriptPort} ns_port @arg {ReplyMsgPending} msg */
export function send_reply_msg(ns_port,msg) {
	return send_port_msg(ns_port,msg);
}
/** @param {NetscriptPort} ns_port @returns {CallMsgPending} */
export function read_call_msg(ns_port) {
	let msg=async_read_port_msg(ns_port);
	if(msg.id==="call") return msg;
	throw new Error("Bad state");
}
/** @param {NetscriptPort} ns_port @returns {CallMsgPending} */
export function peek_call_msg(ns_port) {
	let msg=async_port_peek_msg(ns_port);
	if(msg.id==="call") return msg;
	throw new Error("Bad state");
}
/** @param {NetscriptPort} ns_port @returns {ReplyMsgPending} */
export function peek_reply_msg(ns_port) {
	let msg=async_port_peek_msg(ns_port);
	if(msg.id==="reply") return msg;
	throw new Error("Bad state");
}
/** @param {NetscriptPort} ns_port @returns {ReplyMsgPending} */
export function read_reply_msg(ns_port) {
	let msg=async_read_port_msg(ns_port);
	if(msg.id==="reply") return msg;
	throw new Error("Bad state");
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
	while(request_port.empty()) {
		let sent=send_call_msg(request_port,{call: "pending",id: "call",reply: []});
		if(!sent) throw new Error("Invalid state");
		await ns.sleep(0);
	}
	while(reply_port.empty()) {
		let sent=send_reply_msg(reply_port,{call: "pending",id: "reply",reply: []});
		if(!sent) throw new Error("Invalid state");
		await ns.sleep(0);
	}
	if(reply_port.empty()) throw new Error("Invalid state");
	if(request_port.empty()) throw new Error("Invalid state");
	let cur_msg=read_call_msg(request_port);
	cur_msg.reply.push({call: call_id,args: [id]});
	let sent=send_call_msg(request_port,cur_msg);
	if(!sent) throw new Error("Invalid state");
	for(;;) {
		await ns.sleep(0);
		let pending_msg=peek_reply_msg(reply_port);
		let accepted_messages=[];
		if(pending_msg.reply.length===0) {
			let cur_msg=read_call_msg(request_port);
			cur_msg.reply.push({call: call_id,args: [id]});
			let sent=send_call_msg(request_port,cur_msg);
			if(!sent) throw new Error("Invalid state");
			await ns.sleep(0);
			continue;
		}
		for(let msg of pending_msg.reply) {
			if(!should_accept(msg,call_id,id)) continue;
			accepted_messages.push(msg);
			for(;;) {
				while(notify_complete_port.full()) await ns.sleep(0);
				notify_complete_port.write(msg.uid);
				break;
			}
		}
		for(let ok_msg of accepted_messages) {
			let ret=ok_msg.reply;
			assume_return(ret);
			return ret;
		}
	}
}
/** @template {CallMsg["call"]} CallId @arg {HackState} this_ @arg {CallId} call_id */
export function generic_get_call(this_,call_id) {
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
