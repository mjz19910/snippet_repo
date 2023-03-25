/** @param {NS} ns */
export async function main(ns) {
	if (ns.args[0] !== "auto") ns.tail();
	while (true) {
		await ns.share();
	}
}