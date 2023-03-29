// infiltration-auto

import {DomList} from "/dom/purchase-tor-router.js";
import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	ns.moveTail(250+150+4+2,3);
	ns.disableLog("disableLog");
	const win=globalThis;
	if(!("root" in win)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(win.root);
	if(!("root" in window)) return;
	let dom_list=new DomList(root_element);
	dom_list.city_button;
}
