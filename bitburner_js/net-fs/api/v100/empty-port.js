import {ObjectPort,get_reply_port,get_request_port} from "/api/v100/hack-support.js";
/** @arg {NS} ns @template {ObjectPort<any>} T @arg {T} ns_port @arg {(x:ObjectPort<any>)=>void} reset_port */
async function read_all_ns_port(ns,ns_port,reset_port) {
	while(!ns_port.empty()) {
		let msg=ns_port.read();
		ns.tprint(msg);
	}
	reset_port(ns_port);
}
/** @param {NS} ns */
export async function main(ns) {
	await read_all_ns_port(ns,get_request_port(ns),(port) =>
		port.mustWrite({call: "pending",id: "call",reply: []}));
	await read_all_ns_port(ns,get_reply_port(ns),(port) =>
		port.mustWrite({call: "pending",id: "reply",reply: []}));
}
