import {create_fake, fake} from "../browser_fake_dom/src/browse/mod.js";
import {handle_onPageLoadStarted} from "../browser_fake_dom/src/event/handle_onPageLoadStarted.js";
import {on_page_data_loaded} from "../page_loader/on_page_data_loaded.js";
/**
 * @arg {string} req_url
 * @param {Parameters<typeof handle_onPageLoadStarted>[1]} state
 */
export function init_wget(state,req_url) {
	if(!fake.window) {
		create_fake.window();
	}
	if(!fake.window) throw new Error("No window");
	handle_onPageLoadStarted(fake.window,state);
	state.url=req_url;
	return state;
}
/**
 * @arg {Uint8Array} page_content
 * @arg {string} page_url
 * @param {import("../browser_fake_dom/src/types/onPageLoadStarted.js").PageLoadStateType} state
 */
export function wget_on_static_page_load(state,page_content,page_url) {
	if(!fake.document) throw new Error("No document");
	if(!fake.window) throw new Error("No window");
	console.log("static page content",'"'+page_content.slice(0,48)+'"'+"...",page_content.length);
	let static_req_state={
		url: page_url,
		no_repl: state.no_repl,
	};
	on_page_data_loaded(fake.window,fake.document,static_req_state,null,page_content);
	let repl={
		on_finished() {}
	};
	// get_repl_activator(static_req_state)
	if(repl) {
		repl.on_finished();
	}
}
export const use_mod={
	get imports() {
		/**@type {{}[]}*/
		let t=[];
		return t;
	}
};

export function get_use_data() {
	return use_mod;
}
