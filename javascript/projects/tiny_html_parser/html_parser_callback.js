import {mkdir, writeFile} from "fs/promises";
import {dirname} from "path";
import {HTMLState} from "./HTMLState.js";
import {lex_html} from "../tiny_html_lexer/lex_html.js";
import {on_html_lex_result} from "../tiny_html_lexer/on_html_lex_result.js";
/**
 * @param {HTMLState} html_state
 * @param {Uint8Array} html
 */
export function html_parser_callback(html_state, html) {
	let file_path = "";
	let file_url = html_state.request_state?.url;
	if(!file_url) throw new Error("request with no url");
	let url_obj = new URL(file_url);
	if(url_obj.pathname.endsWith("/")) {
		file_path = "mirror/" + url_obj.host + url_obj.pathname + "index.html";
	} else {
		file_path = "mirror/" + url_obj.host + url_obj.pathname;
	}
	console.log(url_obj.href, 'cached as', file_path);
	mkdir(dirname(file_path), {recursive: true}).then(()=>{;
		writeFile(file_path, html);
	});
	let parse_result_promise = lex_html(html);
	let parse_result = on_html_lex_result(html_state, html, parse_result_promise);
	// TODO: parse the lexed tags into a DOM tree and
	// attach the root node of that tree to document_root
	return parse_result.document_root;
}
