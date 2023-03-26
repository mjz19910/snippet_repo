/** @param {NS} ns */
export async function main(ns) {
	const host = ns.args[0];
	const log_args = [
		host,
		ns.formatRam(ns.getServerMaxRam(host)),
		ns.formatNumber(ns.getServerMoneyAvailable(host)),
		ns.formatNumber(ns.getServerMaxMoney(host)),
	]
	ns.tprintf("> %s\n--RAM: %s\n--Money: $%s of $%s", ...log_args);
}