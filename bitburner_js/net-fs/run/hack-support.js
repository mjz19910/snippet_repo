/** @typedef {ReplyMsg1|ReplyMsg2|ReplyMsg3|ReplyMsg4|ReplyMsg5|ReplyMsg6} ReplyMsg */
/** @typedef {{call:"getServerMaxMoney";id:string;reply:number;}} ReplyMsg1 */
/** @typedef {{call:"getServerMinSecurityLevel";id:string;reply:number}} ReplyMsg2 */
/** @typedef {{call:"getServerSecurityLevel";id:string;reply:number}} ReplyMsg3 */
/** @typedef {{call:"getServerMoneyAvailable";id:string;reply:number}} ReplyMsg4 */
/** @typedef {{call:"get_server";id:string;reply:Server}} ReplyMsg5 */
/** @typedef {{call:"get_hack_target";id:string;reply:Server}} ReplyMsg6 */

/** @typedef {CallMsg1|CallMsg2|CallMsg3|CallMsg4|CallMsg5|CallMsg6} CallMsg */
/** @typedef {{call:"getServerMaxMoney",args:[string]}} CallMsg1 */
/** @typedef {{call:"getServerMinSecurityLevel",args:[string]}} CallMsg2 */
/** @typedef {{call:"getServerSecurityLevel",args:[string]}} CallMsg3 */
/** @typedef {{call:"getServerMoneyAvailable",args:[string]}} CallMsg4 */
/** @typedef {{call:"get_server",args:[string]}} CallMsg5 */
/** @typedef {{call:"get_hack_target",args:[string]}} CallMsg6 */

export const request_port_id=1;
export const reply_port_id=2;
export const log_port_id=3;
export const reply_retry_port_id=4;

/** @param {NS} ns @param {NetscriptPort} ns_port */
export async function async_port_read_data(ns,ns_port) {
	if(!ns_port) debugger;
	while(ns_port.empty()) {
		await ns.sleep(100);
	}
	let data=ns_port.read();
	if(data==="NULL PORT DATA") throw new Error("Invalid message");
	return data;
}
/** @param {NS} ns @param {NetscriptPort} ns_port @param {PortData} str */
export async function async_port_write_data(ns,ns_port,str) {
	/** @type {PortData|null} */
	let popped=str;
	while(popped!==null) {
		popped=ns_port.write(popped);
		if(popped===null) break;
		await ns.sleep(100);
	}
}
/** @template {{}} T @param {NS} ns @param {NetscriptPort} ns_port @returns {Promise<T>} */
export async function async_read_port_msg(ns,ns_port) {
	let data=await async_port_read_data(ns,ns_port);
	if(typeof data==="number") throw new Error("Invalid message");
	return JSON.parse(data);
}
/** @param {NS} ns @param {NetscriptPort} ns_port @arg {{}} msg */
export function send_port_msg(ns,ns_port,msg) {
	return async_port_write_data(ns,ns_port,JSON.stringify(msg));
}
/** @param {NS} ns @arg {NetscriptPort} ns_port @arg {CallMsg} msg */
export function send_call_msg(ns,ns_port,msg) {
	return send_port_msg(ns,ns_port,msg);
}
/** @param {NS} ns @arg {NetscriptPort} ns_port @arg {ReplyMsg} msg */
export function send_reply_msg(ns,ns_port,msg) {
	return send_port_msg(ns,ns_port,msg);
}
/** @param {NS} ns @param {NetscriptPort} ns_port @returns {Promise<CallMsg>} */
export function read_call_msg(ns,ns_port) {
	return async_read_port_msg(ns,ns_port);
}
/** @param {NS} ns @param {NetscriptPort} ns_port @returns {Promise<ReplyMsg>} */
export function read_reply_msg(ns,ns_port) {
	return async_read_port_msg(ns,ns_port);
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
/** @template {CallMsg["call"]} CallId @param {NS} ns @arg {string} target @arg {CallId} call_id */
export async function generic_get_call(ns,target,call_id) {
	const request_port=ns.getPortHandle(request_port_id);
	const reply_port=ns.getPortHandle(reply_port_id);
	const retry_reply_handle=ns.getPortHandle(reply_retry_port_id);
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	let prev=send_call_msg(ns,request_port,{call: call_id,args: [target]});
	if(prev!==null) await prev;
	for(;;) {
		let msg=await read_reply_msg(ns,reply_port);
		if(!should_accept(msg,call_id,target)) {
			await async_port_write_data(ns,retry_reply_handle,JSON.stringify(msg));
			continue;
		}
		let ret=msg.reply;
		assume_return(ret);
		return ret;
	}
}
/** @param {NS} ns @arg {string} target */
export function getServerMaxMoney_(ns,target) {
	const call_id="getServerMaxMoney";
	return generic_get_call(ns,target,call_id);
}
/** @param {NS} ns @arg {string} target */
export async function getServerMinSecurityLevel_(ns,target) {
	const call_id="getServerMinSecurityLevel";
	return generic_get_call(ns,target,call_id);
}
/** @param {NS} ns @arg {string} target */
export async function getServerSecurityLevel_(ns,target) {
	const call_id="getServerSecurityLevel";
	return generic_get_call(ns,target,call_id);
}
/** @param {NS} ns @arg {string} target */
export async function getServerMoneyAvailable_(ns,target) {
	const call_id="getServerMoneyAvailable";
	return generic_get_call(ns,target,call_id);
}
