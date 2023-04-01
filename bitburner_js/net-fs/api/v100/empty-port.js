import {NetscriptPortV2} from "/api/v100/hack-support.js";
/** @arg {NS} ns @arg {NetscriptPortV2} ns_port */
async function read_all_ns_port(ns,ns_port) {
	while(!ns_port.empty()) {
		let msg=ns_port.read();
		ns.tprint(msg);
	}
}
/** @param {NS} ns */
export async function main(ns) {
	await read_all_ns_port(ns,NetscriptPortV2.getPortHandle(ns,1));
	await read_all_ns_port(ns,NetscriptPortV2.getPortHandle(ns,2));
}
