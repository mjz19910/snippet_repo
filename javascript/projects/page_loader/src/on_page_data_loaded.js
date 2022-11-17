import {do_html_load} from "./do_html_load.js";
import {PageLoaderHTMLState} from "./PageLoaderHTMLState.js";
import {PageLoaderState} from "./PageLoaderState.js";
import {ReplPluginManager} from "../../repl_plugin/index.js";

/**
 * @arg {Parameters<typeof do_html_load>[0]} window
 * @arg {Error|null} err
 * @arg {Uint8Array|null} html_document_content
 * @arg {Parameters<typeof do_html_load>[1]} document
 * @arg {PageLoaderState} state
 */
export async function on_page_data_loaded(window,document,state,err,html_document_content) {
	console.log("on_page_data_loaded");
	if(err) {
		console.log('on_page_data_loaded error',err);
		return;
	}
	// document content should not be null if there is no error
	if(!html_document_content) throw new Error("Unexpected null content");
	state.html_state=new PageLoaderHTMLState(state);
	console.log("TODO: get_repl_activator");
	/**@type {ReplPluginManager} */
	let repl=new ReplPluginManager(state);
	if(repl&&!state.no_repl) {
		repl.context.get_http_req_state=() => state;
		repl.displayPrompt();
	}
	await do_html_load(window,document,state,html_document_content);
	console.log('tasks',state.html_state.tasks);
}
