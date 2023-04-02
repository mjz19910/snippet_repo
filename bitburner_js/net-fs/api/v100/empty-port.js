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
export function reset_request_port(ns) {
	return read_all_ns_port(ns,get_request_port(ns),(port) =>
		port.mustWrite({call: "pending",id: "call",reply: []}));
}
/** @param {NS} ns */
export function reset_reply_port(ns) {
	return read_all_ns_port(ns,get_reply_port(ns),(port) =>
		port.mustWrite({call: "pending",id: "reply",reply: []}));
}
/** @param {NS} ns */
export async function reset_all_ports(ns) {
	await reset_request_port(ns);
	await reset_reply_port(ns);
}
/** @param {NS} ns */
export function main(ns) {
	return reset_all_ports(ns);
}
