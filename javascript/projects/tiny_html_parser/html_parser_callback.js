import {mkdir,writeFile} from "fs/promises";
import {on_html_lex_result} from "../tiny_html_lexer/on_html_lex_result.js";
import {PageLoaderHTMLState} from "../page_loader/PageLoaderHTMLState.js";
import {g_html_lexer} from "./g_html_lexer.js";
import {dirname} from "path";
/**
 * @template T
 * @arg {T} this_T
 * @param {PageLoaderHTMLState} html_state
 * @param {Uint8Array} html
 */
export async function html_parser_callback(this_T,html_state,html) {
	void this_T;
	let file_path="";
	if(!html_state.request_state) throw new Error("no request state");
	let file_url=html_state.request_state.url;
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
		let lex_result=g_html_lexer.value.self_lex_html(html);
		let new_html_state=html_state.copy();
		let parse_result=g_html_lexer.value.on_lex_result(new_html_state,lex_result);
		// TODO: parse the lexed tags into a DOM tree and
		// attach the root node of that tree to document_root
		return parse_result;
	} catch(e) {
		console.log(e);
		return null;
	}
}
