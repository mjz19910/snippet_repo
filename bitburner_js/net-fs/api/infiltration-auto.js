// infiltration-auto

import {query_element} from "/dom/dom-support.js";
import {DomList} from "/dom/DomList.js";
import {as_any} from "/run/as.js";
class InfiltrationDomState extends DomList {
	target_map={
		Chongqing: {
			["KuaiGong International"]: true,
		},
		Volhaven: {
			/** @type {true} */
			NWO: true,
		},
	};
	/** @arg {keyof typeof this['target_map']} city */
	goto_city(city) {
		let current_page=this.click_to_page(this.travel_button);
		const all_span=current_page.querySelectorAll("span");
		switch(city) {
			case "Chongqing": {
				debugger;
			} break;
			case "Volhaven": {
				const volhaven_city=all_span[1];
				this.click_on(volhaven_city);
			} break;
		}
		current_page=this.click_to_page(this.city_button);
		const city_location=current_page.children[0].textContent;
		if(city_location!==city) throw new Error();
		const backdrop_root=query_element(this.document_,"div.MuiBackdrop-root");
		this.click_on_1(backdrop_root);
		return current_page;

	}
	/** @arg {NS} ns */
	async play_infiltration(ns) {
		const target_city="Chongqing";
		const city_map=this.target_map["Chongqing"];
		const map_location="KuaiGong International";
		if(!city_map[map_location]) {
			debugger;
		}
		const dom_list=this;
		let current_page=this.click_to_page(this.city_button);
		const city_location=current_page.children[0].textContent;
		if(city_location!==target_city) this.goto_city(target_city);
		const nwo_map_location=query_element(current_page,`[aria-label='${map_location}']`);
		this.current_page=this.click_to_page(nwo_map_location);
		const company_action_buttons=dom_list.current_page.children[2];
		const infiltrate_company_button=company_action_buttons.children[4];
		this.click_on_trusted(infiltrate_company_button);
		let current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
		const start_infiltrate_button=current_container.children[1].children[2].children[0];
		/** @type {any} */
		let e_target_obj_any=EventTarget;
		/** @type {{__arg_list_for_add_event_listeners:[WeakRef<Node>,number,"keydown",WeakRef<(x:{})=>{}>][]}} */
		let EventTarget_=e_target_obj_any;
		EventTarget_.__arg_list_for_add_event_listeners.length=0;
		this.click_on(start_infiltrate_button);
		await ns.sleep(33);
		forever_loop: for(;;) {
			current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
			while(current_container.children[1].children[0].textContent==="Get Ready!") {
				await ns.sleep(33);
				current_container=this.get_div(this.root,"#root > div.MuiBox-root div.MuiContainer-root");
			}
			/** @type {(["mines",("mine"|"empty")[]]|["cut_num",number]|["enter_code","key","up"|"down"|"left"|"right"]|["type_rev",string]|["type_bracket",string])[]} */
			let instruction_arr=[];
			const instruction_source=current_container.children[2].children;
			this.instruction_source=instruction_source;
			const game_instruction=instruction_source[0].textContent;
			console.log("game",JSON.stringify(game_instruction));
			switch(game_instruction) {
				case "Enter the Code!": {
					let node_text=instruction_source[1].textContent;
					switch(node_text) {
						default: console.log("enter_code",node_text); debugger; break;
						case "↑": instruction_arr.push(["enter_code","key","up"]); break;
						case "↓": instruction_arr.push(["enter_code","key","down"]); break;
						case "←": instruction_arr.push(["enter_code","key","left"]); break;
						case "→": instruction_arr.push(["enter_code","key","right"]); break;
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
					let bracket_res=[];
					for(let bracket of bracket_arr) {
						switch(bracket) {
							case "(":
							case "[":
							case "{":
							case "<": bracket_res.unshift(close_map[bracket]);
						}
					}
					instruction_arr.push(["type_bracket",bracket_res.join("")]);
				} break;
				case "Say something nice about the guard": {
					debugger;
				} break;
				case "Remember all the mines!": {
					const mine_grid=instruction_source[1].children;
					/** @type {("mine"|"empty")[]} */
					let mine_arr=[];
					for(let i=0;i<mine_grid.length;i++) {
						let mine_pos=mine_grid[i];
						if(typeof this.get_react_props(mine_pos).children.type==="symbol") {
							mine_arr.push("empty");
						} else {
							mine_arr.push("mine");
						}
					}
					instruction_arr.push(["mines",mine_arr]);
				} break;
				case "Attack when his guard is down!": {
					while(instruction_source[1].textContent?.includes("Guarding")) {
						await ns.sleep(33);
					}
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
					case "enter_code": {
						debugger;
					} break;
					case "type_rev": {
						const handler_ref=EventTarget_.__arg_list_for_add_event_listeners[5][3];
						const handler=handler_ref.deref();
						if(!handler) throw new Error("No handler");
						const str_lower=instruction[1].toLowerCase(); str_lower;
						for(let char of str_lower) {
							debugger;
							handler({isTrusted: true,charCode: char.charCodeAt(0),key: char});
						}
						debugger;
					} break;
					case "type_bracket": {

					} break;
					case "mines": {
						const [,mine_arr]=instruction;
						switch(mine_arr.length) {
							default: debugger; break;
							case 3*4: {
								let mine_grid=[];
								for(let i=0;i<mine_arr.length;i+=3) {
									mine_grid.push(mine_arr.slice(i,i+3));
								}
								let grid_str=mine_grid.map(row => {
									return row.map(v => v==="mine"? "*":" ").join("");
								}).join("\n");
								console.log(grid_str);
								debugger;
							} break;
						}
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
	ns.moveTail(250+150+300+4+2,3);
	ns.resizeTail(500,200);
	ns.disableLog("disableLog");
	const win=globalThis;
	if(!("root" in win)) return;
	/** @type {HTMLDivElement} */
	const root_element=as_any(win.root);
	if(!("root" in window)) return;
	let dom_list=new InfiltrationDomState(root_element);
	await dom_list.play_infiltration(ns);
}
