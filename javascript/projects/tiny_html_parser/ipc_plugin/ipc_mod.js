import {HTMLLexerAPI,set_html_lexer} from "../html_parser_callback.js"
/**@type {typeof handle_set_lexer}*/
export function ipc_call(fn,arg_arr) {
	console.log('ipc call',fn,arg_arr)
	switch(fn) {
		case 'set_lexer': {
			set_html_lexer(arg_arr[0])
		} break
	}
}

/**@arg {"set_lexer"} fn_key @arg {[HTMLLexerAPI]} val */
function handle_set_lexer(fn_key,val) {
	if(fn_key!=="set_lexer") throw new Error("Invalid ipc call")
	set_html_lexer(val[0])
}