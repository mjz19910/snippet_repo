import {read_port_msg} from "/run/hack-support.js";
/** @arg {NS} ns @arg {NetscriptPort} ns_port */
async function read_all_ns_port(ns,ns_port) {
	while(!ns_port.empty()) {
		let msg=await read_port_msg(ns_port);
		ns.tprint(msg);
	}
}
/** @param {NS} ns */
export async function main(ns) {
	await read_all_ns_port(ns,ns.getPortHandle(1));
	await read_all_ns_port(ns,ns.getPortHandle(2));
}
