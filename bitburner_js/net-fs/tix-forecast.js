/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");

	const tix=ns.stock;

	const symbols=tix.getSymbols();
	for(let sym of symbols) {
		ns.printf("%s: %s",sym,tix.getForecast(sym));
	}
}