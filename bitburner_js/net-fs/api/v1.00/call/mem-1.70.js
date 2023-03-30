import {as} from "/api/v1.00/as.js";

/** @param {NS} ns */
export function main(ns) {
	ns.hack;
	/** @type {ScriptFlags} */
	let flags_=as(ns.flags([
		["target","hack"],
	]));
	let ret=ns[flags_.target](...flags_._);
	ns.print("ret: ",ret);
	return ret;
}

/** @typedef {{target:"hack";_: [string]}} ScriptFlags */
