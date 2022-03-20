import {get_repl_activator} from "repl-support/repl_activator";
import {FetchRequestState} from "preload";
import {FakeDocument, FakeWindow} from "fake-dom";
import {do_html_load} from "./do_html_load.js";
import {HTMLState} from "mjz-html-parser";
/**
 * @arg {FakeWindow} window
 * @arg {Error|null} err
 * @arg {string|null} html_document_content
 * @arg {FakeDocument} document
 * @arg {import("./types/page_loader_page_load_state.js").LoaderState} state
 */
export function on_page_data_loaded(window, document, state, err, html_document_content) {
	console.log("on_page_data_loaded");
	if(err){
		console.log('on_page_data_loaded error', err);
		return;
	}
	// document content should not be null if there is no error
	if(!html_document_content)throw new Error("Unexpected null content");
	if(!(state instanceof FetchRequestState)){
		throw new Error("Unexpected fetch state type");
	}
	var html_state = new HTMLState(state);
	let repl=get_repl_activator(state);
	if(repl && !state.no_repl) {
		repl.context.get_http_req_state=()=>state;
		repl.context.get_html_task_state=()=>html_state;
		repl.displayPrompt();
	}
	if(document instanceof FakeDocument){
		do_html_load(window, document, html_state, html_document_content);
	}
	console.log('tasks', html_state.tasks);
}
