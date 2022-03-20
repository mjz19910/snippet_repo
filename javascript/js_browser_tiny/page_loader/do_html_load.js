import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {html_parser_callback} from "../tiny_html_parser/html_parser_callback.js";
import {FakeDocument} from "../fake_dom/FakeDocument.js";
import {FakeWindow} from "../fake_dom/FakeWindow.js";
import {HTMLState} from "./HTMLState.js";
/**
 * @param {FakeDocument} document
 * @param {FakeWindow} window
 * @param {HTMLState} state
 * @param {string} html_document_content
 */
export function do_html_load(window, document, state, html_document_content) {
	void window;
	console.log('do_html_load');
	document.setHTMLParserCallback(html_parser_callback);
	state.tag_handlers = new DOMTagLoadHandlers(document);
	document.doc_root = document.parseHTMLContent(state, html_document_content.toString());
}
