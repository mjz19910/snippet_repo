/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	let work=ns.singularity.getCurrentWork();
	ns.print(work);
}
