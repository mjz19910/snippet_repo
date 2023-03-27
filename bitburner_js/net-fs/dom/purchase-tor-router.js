import {as_div_element,as_svg_element,query_element} from "/dom/dom-support.js";
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
		/** @arg {HTMLDivElement} header_element */
		expand_collapsed_section(header_element) {
			if(as_svg_element(query_element(header_element,"svg:nth-child(3)")).dataset.testid==="ExpandMoreIcon") {
				let r=Object.values(header_element)[1];
				r.onClick();
			}
		}
		/** @arg {HTMLDivElement} root_element */
		constructor(root_element) {
			/** @type {HTMLDivElement} */
			const MuiDrawer_root=query_element(root_element,"div.MuiBox-root>div.MuiDrawer-root");
			/** @type {HTMLDivElement} */
			const MuiPaper_root=query_element(MuiDrawer_root,"div.MuiPaper-root");
			/** @type {HTMLUListElement} */
			const MuiList_root=query_element(MuiPaper_root,"ul.MuiList-root");
			this.hacking_section_header=as_div_element(MuiList_root.children[0]);
			this.expand_collapsed_section(this.hacking_section_header);
			// 2,5,8 are dividers
			this.character_section_header=as_div_element(MuiList_root.children[3]);
			this.expand_collapsed_section(this.character_section_header);
			this.help_section_header=as_div_element(MuiList_root.children[9]);
			this.expand_collapsed_section(this.help_section_header);
			this.world_section_header=as_div_element(MuiList_root.children[6]);
			this.expand_collapsed_section(this.world_section_header);

			const hacking_section=MuiList_root.children[1];
			const character_section=MuiList_root.children[4];
			const world_section=MuiList_root.children[7];
			const help_section=MuiList_root.children[10];

			this.terminal_button=hacking_section.children[0].children[0].children[0];
			this.script_editor_button=hacking_section.children[0].children[0].children[1];
			this.active_scripts_button=hacking_section.children[0].children[0].children[2];
			this.create_program_button=hacking_section.children[0].children[0].children[3];

			this.stats_button=character_section.children[0].children[0].children[0];
			this.factions_editor_button=character_section.children[0].children[0].children[1];
			this.augmentations_button=character_section.children[0].children[0].children[2];
			this.hacknet_button=character_section.children[0].children[0].children[3];

			this.city_button=world_section.children[0].children[0].children[0];
			this.travel_button=world_section.children[0].children[0].children[1];
			this.stock_market_button=world_section.children[0].children[0].children[2];

			this.milestones_button=help_section.children[0].children[0].children[0];
			this.tutorial_button=help_section.children[0].children[0].children[1];
			this.achievements_button=help_section.children[0].children[0].children[2];
			this.options_button=help_section.children[0].children[0].children[3];

			this.hacking_section=hacking_section;
			this.character_section=character_section;
			this.world_section=world_section;
			this.help_section=help_section;
		}
		async use() {
			/** @type {any} */
			let win_any=window;
			win_any.__dom_list=this;
		}
	}
	await new DomList(root_element).use();
}

