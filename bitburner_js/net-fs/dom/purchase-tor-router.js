import {as_svg_element,query_element} from "/dom/dom-support.js";
import {as_any} from "/run/as.js";

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
		this.current_container=null;

		let win=this.window_();
		win.dom_list=this;
	}
	/** @param {ParentNode} node @returns {{onClick(event:{isTrusted:boolean}):void;}} */
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
		if(div instanceof HTMLDivElement) return div;
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
	async buy_tor_router() {
		this.current_page=this.click_to_page(this.city_button);
		const city_location=this.current_page.children[0].textContent;
		if(city_location!=="Sector-12") throw new Error("Handle new city");
		const alpha_enterprises_map_location=query_element(this.current_page,"[aria-label='Alpha Enterprises']");
		this.current_page=this.click_to_page(alpha_enterprises_map_location);
		const purchase_tor_router_button=this.current_page.children[8];
		this.click_on(purchase_tor_router_button);
		const backdrop_root=query_element(this.document_,"div.MuiBackdrop-root");
		this.click_on_1(backdrop_root);
		this.current_page=this.click_to_page(this.terminal_button);
	}
	/** @arg {NS} ns */
	async play_infiltration(ns) {
		const dom_list=this;
		this.current_page=this.click_to_page(this.city_button);
		const city_location=this.current_page.children[0].textContent;
		if(city_location!=="Volhaven") {
			this.current_page=this.click_to_page(this.travel_button);
			const volhaven_city=this.current_page.querySelectorAll("span")[1];
			this.click_on(volhaven_city);
			this.current_page=this.click_to_page(this.city_button);
			const city_location=this.current_page.children[0].textContent;
			if(city_location!=="Volhaven") throw new Error();
			const backdrop_root=query_element(this.document_,"div.MuiBackdrop-root");
			this.click_on_1(backdrop_root);
		}
		const nwo_map_location=query_element(this.current_page,"[aria-label=NWO]");
		this.current_page=this.click_to_page(nwo_map_location);
		const company_action_buttons=dom_list.current_page.children[2];
		const infiltrate_company_button=company_action_buttons.children[4];
		this.click_on_trusted(infiltrate_company_button);
		let current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
		const start_infiltrate_button=current_container.children[1].children[2].children[0];
		this.click_on(start_infiltrate_button);
		await ns.sleep(33);
		forever_loop: for(;;) {
			current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
			while(current_container.children[1].children[0].textContent==="Get Ready!") {
				await ns.sleep(33);
				current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
			}
			/** @type {(["cut_num",number]|["key","left"]|["type_rev",string]|["type_bracket",string])[]} */
			let instruction_arr=[];
			const instruction_source=current_container.children[2].children;
			this.instruction_source=instruction_source;
			const game_instruction=instruction_source[0].textContent;
			console.log("game",JSON.stringify(game_instruction));
			switch(game_instruction) {
				case "Enter the Code!": {
					const left_char="→";
					let node_text=instruction_source[1].textContent;
					switch(node_text) {
						default: console.log("enter_code",node_text); debugger; break;
						case left_char: instruction_arr.push(["key","left"]); break;
					}
				} break;
				case "Type it backward": {
					let node_text=instruction_source[1].textContent;
					if(node_text===null) throw new Error("Invalid textContent");
					instruction_arr.push(["type_rev",node_text]);
				} break;
				case "Close the brackets": {
					let node_text=instruction_source[1].textContent;
					if(node_text===null) throw new Error("Invalid textContent");
					let bracket_arr=node_text.split("");
					const close_map={
						"(": ")",
						"[": "]",
						"{": "}",
						"<": ">",
					};
					let bracket_res="";
					for(let bracket of bracket_arr) {
						switch(bracket) {
							case "(": bracket_res+=close_map[bracket]; break;
							case "[": bracket_res+=close_map[bracket]; break;
							case "{": bracket_res+=close_map[bracket]; break;
							case "<": bracket_res+=close_map[bracket]; break;
						}
					}
					instruction_arr.push(["type_bracket",bracket_res]);
				} break;
				case "Say something nice about the guard": {
					debugger;
				} break;
				default: {
					for(let i=1;i<instruction_source.length-1;i++) {
						let node_text=instruction_source[i].textContent;
						if(node_text===null) throw new Error("Invalid textContent");
						let match_arr=node_text.match(/Cut wires number (\d)\./);
						if(match_arr) {
							instruction_arr.push(["cut_num",parseInt(match_arr[1])]);
						} else {
							console.log("unable to match:",node_text);
							debugger;
							break forever_loop;
						}
					}
					this.current_container=current_container;
					debugger;
				} break;
			}
			for(let instruction of instruction_arr) {
				switch(instruction[0]) {
					case "cut_num": debugger; break;
					case "key": {
						debugger;
					} break;
					case "type_rev": {
						const str_lower=instruction[1].toLowerCase(); str_lower;
						debugger;
					} break;
				}
			}
			console.log("game",JSON.stringify(instruction_arr));
			break;
		}
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
	function purchase_tor_router() {
		if(ns.hasTorRouter()) return;
		ns.print("start: purchase_tor_router");
		return new DomList(root_element).buy_tor_router();
	}
	let res=purchase_tor_router();
	if(res) await res;
}
