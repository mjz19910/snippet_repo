/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.tprintf("--- TIX Start ---");
	let symbols=ns.stock.getSymbols();
	let stock_ask_price=new Map;
	for(let cur_sym of symbols) {
		let ask_price=ns.stock.getAskPrice(cur_sym);
		stock_ask_price.set(cur_sym,ask_price);
	}
	const wait_seconds=6;
	await ns.sleep(wait_seconds*1000);
	/** @type {Map<string,number[]>} */
	let stock_ask_price_change_rate=new Map;
	for(let cur_sym of symbols) {
		let ask_price=ns.stock.getAskPrice(cur_sym);
		let prev_price=stock_ask_price.get(cur_sym);
		stock_ask_price_change_rate.set(cur_sym,[prev_price-ask_price]);
		stock_ask_price.set(cur_sym,ask_price);
	}
	await ns.sleep(wait_seconds*1000);
	for(let cur_sym of symbols) {
		let ask_price=ns.stock.getAskPrice(cur_sym);
		let prev_price=stock_ask_price.get(cur_sym);
		const price_arr=stock_ask_price_change_rate.get(cur_sym);
		if(!price_arr) continue;
		price_arr.push(prev_price-ask_price);
		ns.tprintf("%s:\t%s",cur_sym,price_arr.map(v => ns.formatNumber(v,0)).map(s => {
			if(s.startsWith("-")) {
				let w=s.split("-")[1];
				if(w.length===1) return "-  "+w;
				if(w.length===2) return "- "+w;
				if(w.length===3) return "-"+w;
			}
			if(s.length===1) return "   "+s;
			if(s.length===2) return "  "+s;
			if(s.length===3) return " "+s;
			ns.print("len: ",s.length," ",s);
			return s;
		}).join(",\t"));
	}
}
