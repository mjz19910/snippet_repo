import {read_port1_msg,read_ns_port_msg} from "/run/hack-support.js";

/** @param {NS} ns */
export async function main(ns) {
	let msg=read_port1_msg(ns);
	ns.tprint(msg);
	while(msg!==null) {
		msg=read_port1_msg(ns);
		ns.tprint(msg);
	}
	const handle_2=ns.getPortHandle(2);
	while(!handle_2.empty()) {
		let response=await read_ns_port_msg(handle_2);
		ns.tprint(response);
	}
}
