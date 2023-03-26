import {as} from "/run/helper/as.js";

/** @param {NS} ns */
export async function main(ns) {
	/** @type {{_: [string]}} */
	let f_=as(ns.flags([]));
	const {_: [hostname]}=f_;
	const log_args=[
		hostname,
		ns.formatRam(ns.getServerMaxRam(hostname)),
		ns.formatNumber(ns.getServerMoneyAvailable(hostname)),
		ns.formatNumber(ns.getServerMaxMoney(hostname)),
	];
	ns.tprintf("> %s\n--RAM: %s\n--Money: $%s of $%s",...log_args);
}
