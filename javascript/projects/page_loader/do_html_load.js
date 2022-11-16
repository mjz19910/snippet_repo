import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {FakeDocument} from "../browser_fake_dom/src/FakeDocument.js";
import {FakeWindow} from "../browser_fake_dom/src/FakeWindow.js";
import {PageLoaderHTMLState} from "./PageLoaderHTMLState.js";
/**
 * @param {FakeDocument} document
 * @param {FakeWindow} window
 * @param {PageLoaderHTMLState} state
 * @param {Uint8Array} html_document_content
 */
export async function do_html_load(window,document,state,html_document_content) {
	void window;
	console.log('do_html_load');
	state.tag_handlers=new DOMTagLoadHandlers(document);
	document.doc_root=await document.parseHTMLContent(state,html_document_content);
}
