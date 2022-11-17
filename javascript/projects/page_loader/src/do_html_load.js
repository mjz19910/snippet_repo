import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {FakeDocument} from "../../browser_fake_dom/index.js";
import {FakeWindow} from "../../browser_fake_dom/index.js";
import {PageLoaderState} from "./PageLoaderState.js";
/**
 * @param {FakeDocument} document
 * @param {FakeWindow} window
 * @param {PageLoaderState} state
 * @param {Uint8Array} html_document_content
 */
export async function do_html_load(window,document,state,html_document_content) {
	void window;
	console.log('do_html_load');
	if(!state.html_state) throw new Error();
	state.html_state.tag_handlers=new DOMTagLoadHandlers(document);
	document.doc_root=await document.parseHTMLContent(state,html_document_content);
}
