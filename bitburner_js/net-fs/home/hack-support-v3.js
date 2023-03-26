/** @typedef {{id:"getServerMaxMoney",reply:number}|ReplyMsg2} ReplyMsg */
/** @typedef {{id:"getServerMinSecurityLevel",reply:number}|ReplyMsg3} ReplyMsg2 */
/** @typedef {{id:"getServerSecurityLevel",reply:number}|ReplyMsg4} ReplyMsg3 */
/** @typedef {{id:"getServerMoneyAvailable",reply:number}} ReplyMsg4 */

/** @typedef {{call:"getServerMaxMoney",args:[string]}|CallMsg2} CallMsg */
/** @typedef {{call:"getServerMinSecurityLevel",args:[string]}|CallMsg3} CallMsg2 */
/** @typedef {{call:"getServerSecurityLevel",args:[string]}|CallMsg4} CallMsg3 */
/** @typedef {{call:"getServerMoneyAvailable",args:[string]}} CallMsg4 */

/** @param {NS} ns */
export function read_port1_msg(ns) {
	let data=ns.readPort(1);
	if(typeof data==="number") {
		throw new Error("Invalid message");
	}
	if(data==="NULL PORT DATA") return null;
	/** @type {CallMsg} */
	let msg=JSON.parse(data);
	return msg;
}
/** @arg {NS} ns @arg {CallMsg} msg */
export function send_port1_msg(ns,msg) {
	return ns.writePort(1,JSON.stringify(msg));
}
/** @param {NS} ns */
export function read_port2_msg(ns) {
	let data=ns.readPort(2);
	if(typeof data==="number") {
		throw new Error("Invalid message");
	}
	if(data==="NULL PORT DATA") return null;
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
		if(reply_msg.id!=="getServerMinSecurityLevel") {
			ns.print("reject: ",reply_msg);
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
		if(reply_msg.id!=="getServerSecurityLevel") {
			ns.print("reject: ",reply_msg);
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
		if(reply_msg.id!=="getServerMoneyAvailable") {
			ns.print("reject: ",reply_msg);
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
		if(reply_msg.id!=="getServerMaxMoney") {
			ns.print("reject: ",reply_msg);
			ns.writePort(3,JSON.stringify(reply_msg));
			continue;
		}
		reply=reply_msg;
	}
	return reply.reply;
}
