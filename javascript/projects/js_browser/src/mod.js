import {fake} from "../../browser_fake_dom/index.js";
import {on_page_data_loaded,PageLoaderState} from "../../page_loader/index.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin/src/repl_plugin_get_global_repl_activator.js";

/**
 * @param {PageLoaderState} state
 */
export function init_wget(state) {
}
/**
 * @arg {Uint8Array} page_content
 * @arg {string} page_url
 * @param {PageLoaderState} state
 */
export function wget_on_static_page_load(state,page_content,page_url) {
	if(!fake.document) throw new Error("No document");
	if(!fake.window) throw new Error("No window");
	console.log("static page content",'"'+page_content.slice(0,48)+'"'+"...",page_content.length);
	let static_req_state={
		url: page_url,
		no_repl: state.no_repl,
	};
	let req_state=new PageLoaderState(page_url,static_req_state);
	req_state.no_repl=state.no_repl;
	on_page_data_loaded(fake.window,fake.document,req_state,null,page_content);
	let repl={
		on_finished() {}
	};
	repl_plugin_get_global_repl_activator(req_state);
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
