import {as} from "/api/as.js";

/** @param {NS} ns */
export async function main(ns) {
	/** @type {{_:[string]}} */
	let flags_=as(ns.flags([]));
	while(true) {
		await ns.hack(flags_._[0]);
	}
}
