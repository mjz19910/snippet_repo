import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {html_parser_callback} from "../tiny_html_parser/html_parser_callback.js";
import {FakeDocument} from "../browser_fake_dom/src/FakeDocument";
import {FakeWindow} from "../browser_fake_dom/src/FakeWindow";
import {TinyHTMLParserState} from "../tiny_html_parser/TinyHTMLParserState.js";
import {PageLoaderHTMLState} from "./PageLoaderHTMLState.js";
/**do_html_load <- [
 * @type {import("./on_page_data_loaded").on_page_data_loaded}
 *]*/
export let xx;
/**
 * @param {FakeDocument} document
 * @param {FakeWindow} window
 * @param {PageLoaderHTMLState} state
 * @param {Uint8Array} html_document_content
 */
export async function do_html_load(window,document,state,html_document_content) {
	void window;
	console.log('do_html_load');
	document.setHTMLParserCallback(html_parser_callback);
	state.tag_handlers=new DOMTagLoadHandlers(document);
	document.doc_root=await document.parseHTMLContent(state,html_document_content);
}
