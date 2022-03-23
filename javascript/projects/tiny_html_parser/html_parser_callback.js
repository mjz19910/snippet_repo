import {mkdir, writeFile} from "fs/promises";
import {dirname} from "path";
import {HTMLState} from "./HTMLState.js";
export class HTMLLexerAPI {
	/**@arg {Uint8Array} _input*/
	lex_html(_input) {}
	/**
	 * @param {{ request_state: { no_repl: boolean; }; }} _a
	 * @param {void} _b
	 */
	on_lex_result(_a, _b) {
		return {root: {}};
	}
}
/**@type {HTMLLexerAPI|null}*/
let g_html_lexer = null;
/**@arg {HTMLLexerAPI} lexer*/
export function set_html_lexer(lexer) {
	if(!lexer) throw new Error("No lexer");
	if(!lexer.lex_html) {
		throw new Error("Invalid lexer");
	}
	g_html_lexer = lexer;
}
/**
 * @param {HTMLState} html_state
 * @param {Uint8Array} html
 */
export async function html_parser_callback(html_state, html) {
	let file_path = "";
	if(!html_state.request_state) throw new Error("no request state");
	let file_url = html_state.request_state.url;
	if(!file_url) throw new Error("request with no url");
	let url_obj = new URL(file_url);
	if(url_obj.pathname.endsWith("/")) {
		file_path = "mirror/" + url_obj.host + url_obj.pathname + "index.html";
	} else {
		file_path = "mirror/" + url_obj.host + url_obj.pathname;
	}
	console.log(url_obj.href, 'cached as', file_path);
	await mkdir(dirname(file_path), {recursive: true})
	await writeFile(file_path, html);
	if(!g_html_lexer) throw new Error("Need html lexer");
	try {
		let lex_result = g_html_lexer.lex_html(html);
		let new_html_state = {
			request_state: {
				no_repl: html_state.request_state.no_repl,
			},
		};
		let parse_result = g_html_lexer.on_lex_result(new_html_state, lex_result);
		// TODO: parse the lexed tags into a DOM tree and
		// attach the root node of that tree to document_root
		return parse_result.root;
	} catch(e) {
		console.log(e);
		return null;
	}
}
