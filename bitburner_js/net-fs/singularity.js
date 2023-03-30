/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.singularity.connect("n00dles");
	await ns.singularity.manualHack();
}
