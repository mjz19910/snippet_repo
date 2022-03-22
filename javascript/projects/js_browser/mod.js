/**
 * @arg {string} req_url
 * @param {{ ok?: boolean; url?: any; }} state
 */
export function init_wget(state, req_url) {
	// handle_onPageLoadStarted
	state.url=req_url;
	return state;
}
/**
 * @arg {Uint8Array} page_content
 * @arg {string} page_url
 * @param {{ fake?: any; on_page_data_loaded?: any; }} state
 */
export function wget_on_static_page_load(state, page_content, page_url) {
	if(!state.fake.document) throw new Error("No document");
	if(!state.fake.window) throw new Error("No window");
	console.log("static page content", '"' + page_content.slice(0, 48) + '"' + "...", page_content.length);
	let static_req_state = {
		url:page_url,
	};
	state.on_page_data_loaded(state.fake.window, state.fake.document, static_req_state, null, page_content);
	let repl = {
		on_finished(){}
	}
	// get_repl_activator(static_req_state);
	if(repl) {
		repl.on_finished();
	}
}
export const use_mod = {
	get imports() {
		/**@type {{}[]}*/
		let t = [];
		return t;
	}
};

export function get_use_data() {
	return use_mod;
}
