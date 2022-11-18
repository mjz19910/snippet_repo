import {HTMLLexerResult,HTMLTokenizer,on_html_lex_result} from "../index.js";
import {PageLoaderState} from "../../page_loader/index.js";

export class HTMLLexerAPI {
	self_lex_html(state: PageLoaderState,input: Uint8Array) {
		state.lexer_state=new HTMLTokenizer;
		state.lexer_state.construct_2(input, "utf-8");
		let html_token=state.lexer_state.next_token();
		console.log(html_token);
	}
	on_lex_result(html_state: PageLoaderState,html: Uint8Array,lexer_result: HTMLLexerResult): HTMLLexerResult {
		return on_html_lex_result(html_state,html,lexer_result);
	}
}
