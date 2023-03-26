/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	let symbols=ns.stock.getSymbols();
	/** @type {Map<string,number>} */
	let stock_ask_price=new Map;
	/** @type {Map<string,number[]>} */
	let stock_ask_price_change_rate=new Map;
	for(let cur_sym of symbols) stock_ask_price_change_rate.set(cur_sym,[]);
	for(;;) {
		await ns.sleep(1000);
		let did_update=false;
		for(let cur_sym of symbols) {
			let cur_price=ns.stock.getAskPrice(cur_sym);
			let prev_price=stock_ask_price.get(cur_sym);
			if(prev_price===void 0) {
				stock_ask_price.set(cur_sym,cur_price);
				prev_price=cur_price;
			}
			if(prev_price===cur_price) continue;
			did_update=true;
		}
		if(!did_update) continue;
		ns.tprintf("--- TIX Start ---");
		for(let cur_sym of symbols) {
			let ask_price=ns.stock.getAskPrice(cur_sym);
			let prev_price=stock_ask_price.get(cur_sym);
			if(!prev_price) continue;
			if(prev_price===ask_price) continue;
			stock_ask_price.set(cur_sym,ask_price);
			const price_arr=stock_ask_price_change_rate.get(cur_sym);
			if(!price_arr) continue;
			price_arr.push(prev_price-ask_price);
			if(price_arr.length>32) {
				while(price_arr.length>16) price_arr.shift();
			}
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
			}).join());
		}
	}
}
