import {as_div_element,as_html_element,as_svg_element,query_element} from "/dom/dom-support.js";
import {as_any} from "/run/as.js";

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
		this.MuiBox_root=query_element(root_element,"#root > div.MuiBox-root");
		/** @type {HTMLDivElement} */
		this.MuiDrawer_root=query_element(this.MuiBox_root,"div.MuiDrawer-root");
		/** @type {HTMLDivElement} */
		this.MuiPaper_root=query_element(this.MuiDrawer_root,"div.MuiPaper-root");
		/** @type {HTMLUListElement} */
		const MuiList_root=query_element(this.MuiPaper_root,"ul.MuiList-root");
		this.MuiList_root=MuiList_root;
		// 2,5,8 are dividers
		this.hacking_section_header=as_div_element(MuiList_root.children[0]);
		this.expand_collapsed_section(this.hacking_section_header);
		this.character_section_header=as_div_element(MuiList_root.children[3]);
		this.expand_collapsed_section(this.character_section_header);
		this.world_section_header=as_div_element(MuiList_root.children[6]);
		this.expand_collapsed_section(this.world_section_header);
		this.help_section_header=as_div_element(MuiList_root.children[9]);
		this.expand_collapsed_section(this.help_section_header);

		const hacking_section=MuiList_root.children[1];
		const character_section=MuiList_root.children[4];
		const world_section=MuiList_root.children[7];
		const help_section=MuiList_root.children[10];

		this.terminal_button=as_div_element(hacking_section.children[0].children[0].children[0]);
		this.script_editor_button=hacking_section.children[0].children[0].children[1];
		this.active_scripts_button=hacking_section.children[0].children[0].children[2];
		this.create_program_button=hacking_section.children[0].children[0].children[3];

		this.stats_button=character_section.children[0].children[0].children[0];
		this.factions_editor_button=character_section.children[0].children[0].children[1];
		this.augmentations_button=character_section.children[0].children[0].children[2];
		this.hacknet_button=character_section.children[0].children[0].children[3];

		this.city_button=as_div_element(world_section.children[0].children[0].children[0]);
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
	/** @arg {HTMLElement} element */
	click_on(element) {
		Object.values(element)[1].onClick();
	}
	/** @arg {HTMLElement} element */
	click_on_1(element) {
		Object.values(element)[1].onClick({});
	}
	/** @returns {Window&{__dom_list:this}} */
	window_() {
		/** @type {any} */
		let win=globalThis;
		return win;
	}
	get document_() {
		return globalThis["document"];
	}
	/** @param {NS} ns */
	async use(ns) {
		if(ns["hasTorRouter"]()) return;
		ns.print("start: purchase_tor_router");
		/** @type {any} */
		let win=this.window_();
		win.__dom_list=this;
		this.click_on(this.city_button);
		/** @type {HTMLDivElement} */
		this.current_page=query_element(this.MuiBox_root,"div.MuiBox-root");
		const city_location=this.current_page.children[0].textContent;
		if(city_location!=="Sector-12") throw new Error("Handle new city");
		/** @type {HTMLSpanElement} */
		const alpha_enterprises_map_location=query_element(this.current_page,"[aria-label='Alpha Enterprises']");
		this.click_on(alpha_enterprises_map_location);
		this.current_page=query_element(this.MuiBox_root,"div.MuiBox-root");
		const purchase_tor_router_button=as_html_element(this.current_page.children[8]);
		this.click_on(purchase_tor_router_button);
		/** @type {HTMLDivElement} */
		const backdrop_root=query_element(this.document_,"div.MuiBackdrop-root");
		this.click_on_1(backdrop_root);
		this.click_on(this.terminal_button);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.tail();
	ns.disableLog("disableLog");
	const win=globalThis;
	// ns.singularity.purchaseTor();
	if(!("root" in win)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(win.root);
	await new DomList(root_element).use(ns);
}
