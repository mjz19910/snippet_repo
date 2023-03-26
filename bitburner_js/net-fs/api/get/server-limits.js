/** @param {NS} ns */
export async function main(ns) {
	const hostname=ns.args[0];
	const log_args=[
		hostname,
		ns.formatRam(ns.getServerMaxRam(hostname)),
		ns.formatNumber(ns.getServerMoneyAvailable(hostname)),
		ns.formatNumber(ns.getServerMaxMoney(hostname)),
	];
	ns.tprintf("> %s\n--RAM: %s\n--Money: $%s of $%s",...log_args);
}
