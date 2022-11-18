import {HTMLTokenizer} from "../index.js";
import {PageLoaderState} from "../../page_loader/index.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin/index.js";
import {g_html_lex_plugin} from "./g_html_lex_plugin.js";

export class HTMLLexerAPI {
	self_lex_html(state: PageLoaderState,input: Uint8Array) {
		state.lexer_state=new HTMLTokenizer;
		state.lexer_state.construct_2(input,"utf-8");
		let html_token=state.lexer_state.next_token();
		console.log(html_token);
	}
	on_lex_result(state: PageLoaderState,lexer_buffer: Uint8Array) {
		let repl=repl_plugin_get_global_repl_activator(state);
		console.log(repl);
		if(!g_html_lex_plugin.value) throw new Error("No lex plugin");
		g_html_lex_plugin.value.update_lexer_buffer(lexer_buffer);
	}
}
