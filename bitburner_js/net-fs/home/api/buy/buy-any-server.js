/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	const buy_size = 2 ** 10;
	let res = ns.purchaseServer("bigram-0", buy_size);
	ns.print(ns.formatRam(buy_size), res);
}