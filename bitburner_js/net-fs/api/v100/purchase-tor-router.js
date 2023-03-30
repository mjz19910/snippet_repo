import {DomList} from "/api/DomList.js";
import {query_element} from "./dom-support.js";
import {as_any} from "./as.js";

class PurchaseTorRouterDomState extends DomList {
	async buy_tor_router() {
		let current_page=this.click_to_page(this.city_button);
		const city_location=current_page.children[0].textContent;
		if(city_location!=="Sector-12") throw new Error("Handle new city");
		const alpha_enterprises_map_location=query_element(current_page,"[aria-label='Alpha Enterprises']");
		current_page=this.click_to_page(alpha_enterprises_map_location);
		const purchase_tor_router_button=current_page.children[8];
		this.click_on(purchase_tor_router_button);
		const backdrop_root=query_element(this.document_,"div.MuiBackdrop-root");
		this.click_on_1(backdrop_root);
		this.current_page=this.click_to_page(this.terminal_button);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("disableLog");
	const win=globalThis;
	// ns.singularity.purchaseTor();
	if(!("root" in win)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(win.root);
	function purchase_tor_router() {
		if(ns.hasTorRouter()) return;
		ns.print("start: purchase_tor_router");
		return new PurchaseTorRouterDomState(root_element).buy_tor_router();
	}
	let res=purchase_tor_router();
	if(res) await res;
}
