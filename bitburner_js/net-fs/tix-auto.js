/** @param {NS} ns */
export async function main(ns) {
	let symbols=ns.stock.getSymbols();
	let stock_ask_price=new Map;
	for(let cur_sym of symbols) {
		let ask_price=ns.stock.getAskPrice(cur_sym);
		stock_ask_price.set(cur_sym,ask_price);
	}
	let chk_sym=symbols[0];
	let cur_ask_price=ns.stock.getAskPrice(chk_sym);
	let prev_ask_price=cur_ask_price;
	const wait_seconds=4;
	while(cur_ask_price===prev_ask_price) {
		cur_ask_price=ns.stock.getAskPrice(chk_sym);
		ns.tprintf(`sleep: ${wait_seconds}s`);
		await ns.sleep(wait_seconds*1000);
	}
	let stock_ask_price_change_rate=new Map;
	for(let cur_sym of symbols) {
		let ask_price=ns.stock.getAskPrice(cur_sym);
		let prev_price=stock_ask_price.get(cur_sym);
		stock_ask_price_change_rate.set(cur_sym,[prev_price-ask_price]);
		ns.tprintf("%s: %s",cur_sym,ns.formatNumber(prev_price-ask_price));
	}
}
