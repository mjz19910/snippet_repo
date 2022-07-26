import {do_html_load} from "./do_html_load.js"
import {HTMLState} from "./HTMLState.js"
/**
 * @arg {Parameters<typeof do_html_load>[0]} window
 * @arg {Error|null} err
 * @arg {Uint8Array|null} html_document_content
 * @arg {Parameters<typeof do_html_load>[1]} document
 * @arg {ConstructorParameters<typeof HTMLState>[0]} state
 */
export async function on_page_data_loaded(window,document,state,err,html_document_content) {
	console.log("on_page_data_loaded")
	if(err) {
		console.log('on_page_data_loaded error',err)
		return
	}
	// document content should not be null if there is no error
	if(!html_document_content) throw new Error("Unexpected null content")
	var html_state=new HTMLState(state)
	console.log("TODO: get_repl_activator")
	// let repl=get_repl_activator(state)
	// if(repl && !state.no_repl) {
	// 	repl.context.get_http_req_state=()=>state
	// 	repl.context.get_html_task_state=()=>html_state
	// 	repl.displayPrompt()
	// }
	await do_html_load(window,document,html_state,html_document_content)
	console.log('tasks',html_state.tasks)
}
