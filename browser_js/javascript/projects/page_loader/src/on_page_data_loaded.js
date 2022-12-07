import {do_html_load} from "./do_html_load.js";
import {PageLoaderState} from "./PageLoaderState.js";
import {get_cached_repl_plugin} from "./get_cached_repl_plugin.js";

/**
 * @arg {PageLoaderState} state
 */
export function on_page_data_loaded(state) {
	console.log("on_page_data_loaded");
	state.html_state;
	let repl=get_cached_repl_plugin(state);
	repl.context.get_http_req_state=() => state;
	repl.displayPrompt();
	do_html_load(state);
	console.log('tasks',state.html_state.tasks);
}
