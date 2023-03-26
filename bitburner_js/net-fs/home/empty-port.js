import {read_port1_msg} from "/hack-support-v3.js";

/** @param {NS} ns */
export async function main(ns) {
	let msg=read_port1_msg(ns);
	while(msg!==null) {
		msg=read_port1_msg(ns);
	}
}
