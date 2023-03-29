// infiltration-auto

import {DomList} from "./purchase-tor-router";
import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	ns.moveTail(250+3,3);
	ns.disableLog("disableLog");
	if(!("root" in window)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(window.root);
	let dom_list=new DomList(root_element);
	dom_list.city_button;
}
