/** @typedef {{target:"getServer";_: [string]}} ScriptFlags */
/** @typedef {{servers:string[];txts: string[];scripts:string[];flags:NS["flags"]}} AutoCompleteData */
/** @arg {AutoCompleteData} data @arg {(string | number | boolean)[]} args */
export function autocomplete(data, args) {
	if (args.length === 1 && args[0] === "--target") {
		return ["getServer"];
	}
	if (args.length === 2) return [...data.servers];
	data.flags([
		["target", "getServer"],
	]);
	return [];
}

/** @param {NS} ns */
export async function main(ns) {
	/** @type {ScriptFlags} */
	let flags_ = ns.flags([
		["target", "getServer"],
	]);
	let ret = ns[flags_.target](...flags_._);
	if (ret instanceof Promise) { ret = await ret; }
	ns.tprint("ret: ", ret);
	return ret;
}

ns.getServer;