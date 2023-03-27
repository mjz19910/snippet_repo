import {as_div_element, as_html_element,query_element} from "/dom/dom-support.js";
import {as_any} from "/run/as.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	ns.disableLog("disableLog");
	// ns.singularity.purchaseTor();
	if(!("root" in window)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(window.root);
	class DomList {
		/** @arg {HTMLDivElement} root_element */
		constructor(root_element) {
			/** @type {HTMLDivElement} */
			const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
			/** @type {HTMLDivElement} */
			const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
			/** @type {HTMLUListElement} */
			const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
			this.hacking_section_header=as_div_element(MuiList_root.children[0]);
			if(as_html_element(query_element(this.hacking_section_header,"svg:nth-child(3)")).dataset.testid!=="ExpandMoreIcon") {
				let r=Object.values(this.hacking_section_header)[1];
				console.log(r);
			}
			this.hacking_section=MuiList_root.children[1];
			// 2 is a divider
			MuiList_root.children[2];
			this.character_section_header=MuiList_root.children[3];
			this.character_section=MuiList_root.children[4];
			MuiList_root.children[5];
			this.world_section_header=MuiList_root.children[6];
			this.world_section=MuiList_root.children[7];
			MuiList_root.children[8];
			this.help_section_header=MuiList_root.children[9];
			this.help_section=MuiList_root.children[10];
		}
		async use() {
			/** @type {any} */
			let win_any=window;
			win_any.__dom_list=this;
		}
	}
	await new DomList(root_element).use();
}

