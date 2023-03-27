/** @typedef {ReplyMsg1|ReplyMsg2|ReplyMsg3|ReplyMsg4|ReplyMsg5} ReplyMsg */
/** @typedef {{call:"getServerMaxMoney";hostname:string;reply:number;}} ReplyMsg1 */
/** @typedef {{call:"getServerMinSecurityLevel";hostname:string;reply:number}} ReplyMsg2 */
/** @typedef {{call:"getServerSecurityLevel";hostname:string;reply:number}} ReplyMsg3 */
/** @typedef {{call:"getServerMoneyAvailable";hostname:string;reply:number}} ReplyMsg4 */
/** @typedef {{call:"get_server";hostname:string;reply:Server}} ReplyMsg5 */

/** @typedef {CallMsg1|CallMsg2|CallMsg3|CallMsg4|CallMsg5|CallMsg6} CallMsg */
/** @typedef {{call:"getServerMaxMoney",args:[string]}} CallMsg1 */
/** @typedef {{call:"getServerMinSecurityLevel",args:[string]}} CallMsg2 */
/** @typedef {{call:"getServerSecurityLevel",args:[string]}} CallMsg3 */
/** @typedef {{call:"getServerMoneyAvailable",args:[string]}} CallMsg4 */
/** @typedef {{call:"get_server",args:[string]}} CallMsg5 */
/** @typedef {{call:"get_hack_target",args:[string]}} CallMsg6 */

/** @param {NS} ns @arg {number} port */
export function read_port_msg(ns,port) {
	let data=ns.readPort(port);
	if(typeof data==="number") {
		throw new Error("Invalid message");
	}
	if(data==="NULL PORT DATA") return null;
	return data;
}
/** @param {NS} ns @arg {number} port @arg {{}} msg */
export function send_port_msg(ns,port,msg) {
	return ns.writePort(port,JSON.stringify(msg));
}
/** @param {NS} ns */
export function read_port1_msg(ns) {
	let data=read_port_msg(ns,1);
	if(data===null) return null;
	/** @type {CallMsg} */
	let msg=JSON.parse(data);
	return msg;
}
/** @arg {NS} ns @arg {CallMsg} msg */
export function send_port1_msg(ns,msg) {
	return send_port_msg(ns,1,msg);
}
/** @arg {NS} ns @arg {ReplyMsg} msg */
export function send_port2_msg(ns,msg) {
	return send_port_msg(ns,2,msg);
}
/** @param {NS} ns */
export function read_port2_msg(ns) {
	let data=read_port_msg(ns,2);
	if(data===null) return null;
	/** @type {ReplyMsg} */
	let msg=JSON.parse(data);
	return msg;
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
	if(reply.hostname!==arg0) return false;
	return true;
}
/** @template {CallMsg["call"]} CallId @param {NS} ns @arg {string} target @arg {CallId} call_id */
async function generic_get_call(ns,target,call_id) {
	/** @arg {any} x @returns {asserts x is Extract<ReplyMsg,{call:CallId}>['reply']} */
	function assume_return(x) {x;}
	for(let rep_count=6;;rep_count++) {
		if(rep_count>=6) {
			send_port1_msg(ns,{call: call_id,args: [target]});
			rep_count=0;
		}
		await ns.sleep(40);
		let msg=read_port2_msg(ns);
		if(msg===null) {
			await ns.sleep(300);
			continue;
		}
		if(!should_accept(msg,call_id,target)) {
			ns.writePort(3,JSON.stringify(msg));
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
