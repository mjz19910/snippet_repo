import {g_html_lexer} from "./g_html_lexer.js";
import {HTMLLexerAPI} from "./HTMLLexerAPI.js";

/**@type {(fn: "set_html_lexer",arg_arr: HTMLLexerAPI)=>void}*/
export function html_lexer_ipc_call(fn,arg_0) {
	console.log('ipc call',fn,arg_0);
	switch(fn) {
		case 'set_html_lexer': {
			g_html_lexer.value=arg_0;
		} break;
	}
}
