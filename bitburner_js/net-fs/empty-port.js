import {read_port1_msg,read_port2_msg} from "/hack-support-v3.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();
	let msg=read_port1_msg(ns);
	ns.tprint(msg);
	while(msg!==null) {
		msg=read_port1_msg(ns);
		ns.tprint(msg);
	}
	let response=read_port2_msg(ns);
	ns.tprint(response);
	while(response!==null) {
		response=read_port2_msg(ns);
		ns.tprint(response);
	}
}