/** @param {NS} ns */
export function main(ns) {
	ns.hack;
	let ret = ns[ns.args[0]](ns.args[1]);
	ns.print("ret: ", ret);
	return ret;
}