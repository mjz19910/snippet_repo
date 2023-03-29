// infiltration-auto

import {query_element} from "/dom/dom-support.js";
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
	/** @type {HTMLDivElement} */
	const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
	/** @type {HTMLDivElement} */
	const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
	/** @type {HTMLUListElement} */
	const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
	console.log(MuiList_root);
}
