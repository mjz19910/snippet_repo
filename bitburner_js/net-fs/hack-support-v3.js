/** @typedef {ReplyMsg1|ReplyMsg2|ReplyMsg3|ReplyMsg4|ReplyMsg5} ReplyMsg */
/** @typedef {{call: "getServerMaxMoney";hostname: string;reply: number;}} ReplyMsg1 */
/** @typedef {{call:"getServerMinSecurityLevel";hostname:string;reply:number}} ReplyMsg2 */
/** @typedef {{call:"getServerSecurityLevel";hostname:string;reply:number}} ReplyMsg3 */
/** @typedef {{call:"getServerMoneyAvailable";hostname:string;reply:number}} ReplyMsg4 */
/** @typedef {{call:"get_server";hostname:string;reply:Server}} ReplyMsg5 */

/** @typedef {{call:"getServerMaxMoney",args:[string]}|CallMsg2} CallMsg */
/** @typedef {{call:"getServerMinSecurityLevel",args:[string]}|CallMsg3} CallMsg2 */
/** @typedef {{call:"getServerSecurityLevel",args:[string]}|CallMsg4} CallMsg3 */
/** @typedef {{call:"getServerMoneyAvailable",args:[string]}|CallMsg5} CallMsg4 */
/** @typedef {{call:"get_server",args:[string]}} CallMsg5 */


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

const trace=false;

/**
 * @param {ReplyMsg} reply
 * @param {string} call_
 * @param {string} arg0
 */
function should_reject(reply,call_,arg0) {
	if(reply.call!==call_) return true;
	if(reply.hostname!==arg0) return true;
	return false;
}

/** @param {NS} ns @arg {string} target */
export async function getServerMinSecurityLevel_(ns,target) {
	const call_id="getServerMinSecurityLevel";
	send_port1_msg(ns,{call: call_id,args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query1");
		await ns.sleep(40);
		let reply_msg=read_port2_msg(ns);
		if(reply_msg===null) {
			await ns.sleep(300);
			continue;
		}
		if(should_reject(reply_msg,call_id,target)) {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		if(reply_msg.call!==call_id) throw new Error("Rejected message");
		reply=reply_msg;
	}
	return reply.reply;
}
/** @param {NS} ns @arg {string} target */
export async function getServerSecurityLevel_(ns,target) {
	const call_id="getServerSecurityLevel";
	send_port1_msg(ns,{call: call_id,args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query2");
		await ns.sleep(40);
		let reply_msg=read_port2_msg(ns);
		if(reply_msg===null) {
			await ns.sleep(300);
			continue;
		}
		if(reply_msg.call!==call_id) {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}
/** @param {NS} ns @arg {string} target */
export async function getServerMoneyAvailable_(ns,target) {
	send_port1_msg(ns,{call: "getServerMoneyAvailable",args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query3");
		await ns.sleep(40);
		let reply_msg=read_port2_msg(ns);
		if(reply_msg===null) {
			await ns.sleep(300);
			continue;
		}
		if(reply_msg.call!=="getServerMoneyAvailable") {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}

/** @param {NS} ns @arg {string} target */
export async function getServerMaxMoney_(ns,target) {
	send_port1_msg(ns,{call: "getServerMaxMoney",args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query4");
		await ns.sleep(40);
		let reply_msg=read_port2_msg(ns);
		if(reply_msg===null) {
			await ns.sleep(300);
			continue;
		}
		if(reply_msg.call!=="getServerMaxMoney") {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}
