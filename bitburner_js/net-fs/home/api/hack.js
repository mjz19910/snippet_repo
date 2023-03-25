/** @param {NS} ns */
export function main(ns) {
	if(typeof ns.args[0]!=="string") throw new Error("Bad args");
	return ns.hack(ns.args[0]);
}