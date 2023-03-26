/** @typedef {{call:"getServerMaxMoney",reply:number}|ReplyMsg2} ReplyMsg */
/** @typedef {{call:"getServerMinSecurityLevel",reply:number}|ReplyMsg3} ReplyMsg2 */
/** @typedef {{call:"getServerSecurityLevel",reply:number}|ReplyMsg4} ReplyMsg3 */
/** @typedef {{call:"getServerMoneyAvailable",reply:number}|ReplyMsg5} ReplyMsg4 */
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

/** @param {NS} ns @arg {string} target */
export async function getServerMinSecurityLevel_(ns,target) {
	send_port1_msg(ns,{call: "getServerMinSecurityLevel",args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query1");
		await ns.sleep(40);
		let data=ns.readPort(2);
		if(data==="NULL PORT DATA") {
			await ns.sleep(1500);
			continue;
		}
		if(typeof data==="number") throw new Error("Invalid reply");
		if(trace) ns.print(data);
		/** @type {ReplyMsg} */
		let reply_msg=JSON.parse(data);
		if(reply_msg.call!=="getServerMinSecurityLevel") {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}
/** @param {NS} ns @arg {string} target */
export async function getServerSecurityLevel_(ns,target) {
	send_port1_msg(ns,{call: "getServerSecurityLevel",args: [target]});
	/** @type {ReplyMsg|null} */
	let reply=null;
	for(;reply===null;) {
		if(trace) ns.print("query2");
		await ns.sleep(40);
		let data=ns.readPort(2);
		if(typeof data==="number") throw new Error("Invalid reply");
		if(data==="NULL PORT DATA") {
			await ns.sleep(1500);
			continue;
		}
		if(trace) ns.print(data);
		/** @type {ReplyMsg} */
		let reply_msg=JSON.parse(data);
		if(reply_msg.call!=="getServerSecurityLevel") {
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
		let data=ns.readPort(2);
		if(typeof data==="number") throw new Error("Invalid reply");
		if(data==="NULL PORT DATA") {
			await ns.sleep(1500);
			continue;
		}
		if(trace) ns.print(data);
		/** @type {ReplyMsg} */
		let reply_msg=JSON.parse(data);
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
		let data=ns.readPort(2);
		if(typeof data==="number") throw new Error("Invalid reply");
		if(data==="NULL PORT DATA") {
			await ns.sleep(1500);
			continue;
		}
		if(trace) ns.print(data);
		/** @type {ReplyMsg} */
		let reply_msg=JSON.parse(data);
		if(reply_msg.call!=="getServerMaxMoney") {
			if(trace) ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}
