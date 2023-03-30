import {as_svg_element,query_element} from "/dom/dom-support.js";


export class DomList {
	/** @arg {ParentNode} header_element */
	expand_collapsed_section(header_element) {
		if(as_svg_element(query_element(header_element,"svg:nth-child(3)")).dataset.testid==="ExpandMoreIcon") {
			let r=Object.values(header_element)[1];
			r.onClick();
		}
	}
	/** @arg {HTMLDivElement} root_element */
	constructor(root_element) {
		this.root=root_element;
		this.MuiBox_root=this.get_div(this.root,"#root > div.MuiBox-root");
		/** @type {HTMLDivElement} */
		this.MuiDrawer_root=this.get_div(this.MuiBox_root,"div.MuiDrawer-root");
		/** @type {HTMLDivElement} */
		this.MuiPaper_root=this.get_div(this.MuiDrawer_root,"div.MuiPaper-root");
		/** @type {HTMLUListElement} */
		const MuiList_root=query_element(this.MuiPaper_root,"ul.MuiList-root");
		this.MuiList_root=MuiList_root;
		// 2,5,8 are dividers
		this.hacking_section_header=MuiList_root.children[0];
		this.expand_collapsed_section(this.hacking_section_header);
		this.character_section_header=MuiList_root.children[3];
		this.expand_collapsed_section(this.character_section_header);
		this.world_section_header=MuiList_root.children[6];
		this.expand_collapsed_section(this.world_section_header);
		this.help_section_header=MuiList_root.children[9];
		this.expand_collapsed_section(this.help_section_header);

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

		this.current_page=this.get_current_page();
		/** @type {HTMLDivElement|null} */
		this.current_container=null;

		let win=this.window_();
		win.dom_list=this;
	}
	/** @param {ParentNode} node @returns {{children:{type:symbol};onClick(event:{isTrusted:boolean}):void;}} */
	get_react_props(node) {
		return Object.values(node)[1];
	}
	/** @arg {ParentNode} element */
	click_on(element) {
		Object.values(element)[1].onClick();
	}
	/** @arg {ParentNode} element */
	click_on_1(element) {
		Object.values(element)[1].onClick({});
	}
	/** @arg {ParentNode} element */
	click_on_trusted(element) {
		this.get_react_props(element).onClick({isTrusted: true});
	}
	/** @returns {Window&{dom_list?:DomList}} */
	window_() {
		/** @type {any} */
		let win=globalThis;
		return win;
	}
	get document_() {
		return globalThis["document"];
	}
	/** @returns {HTMLDivElement} @param {Element} src @param {string} selector */
	get_div(src,selector) {
		let div=query_element(src,selector);
		if(div instanceof HTMLDivElement)
			return div;
		throw new Error("element is not a div element");
	}
	/** @param {ParentNode} target */
	click_to_page(target) {
		this.click_on(target);
		return this.get_current_page();
	}
	get_current_page() {
		return this.get_div(this.MuiBox_root,"div.MuiBox-root");
	}
}
