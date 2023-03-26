/** @param {NS} ns */
export async function main(ns) {
	let symbols=ns.stock.getSymbols();
	let cur_sym=symbols[0];
	let forecast=ns.stock.getForecast(cur_sym);
	ns.printf("%s %s",cur_sym,forecast);
}
