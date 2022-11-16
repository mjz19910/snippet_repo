import {mkdir,writeFile} from "fs/promises";
import {dirname} from "path";
import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {HTMLLexerResult} from "../tiny_html_lexer/src/HTMLLexerResult.js";
import {HTMLTokenizer} from "../tiny_html_lexer/mod_index.js";
import {g_html_lexer} from "./g_html_lexer.js";
/**
 * @template T
 * @arg {T} this_T
 * @param {PageLoaderState} state
 * @param {Uint8Array} html
 * @returns {Promise<HTMLLexerResult|null>}
 */
export async function html_parser_callback(this_T,state,html) {
	void this_T;
	let file_path="";
	if(!state.html_state) throw new Error("no html state");
	let html_state=state.html_state;
	if(!html_state.request_state) throw new Error("no request state");
	let request_state=html_state.request_state;
	let file_url=request_state.url;
	if(!file_url) throw new Error("request with no url");
	let url_obj=new URL(file_url);
	if(url_obj.pathname.endsWith("/")) {
		file_path="mirror/"+url_obj.host+url_obj.pathname+"index.html";
	} else {
		file_path="mirror/"+url_obj.host+url_obj.pathname;
	}
	console.log(url_obj.href,'cached as',file_path);
	await mkdir(dirname(file_path),{recursive: true});
	await writeFile(file_path,html);
	try {
		let new_state=state.copy();
		new_state.lexer_state=new HTMLTokenizer(html);
		let lex_result=g_html_lexer.value.self_lex_html(new_state,html);
		let parse_result=g_html_lexer.value.on_lex_result(new_state,html,lex_result);
		// TODO: parse the lexed tags into a DOM tree and
		// attach the root node of that tree to document_root
		return parse_result;
	} catch(e) {
		console.log(e);
		return null;
	}
}
