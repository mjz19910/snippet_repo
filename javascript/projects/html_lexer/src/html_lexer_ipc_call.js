import {set_html_lexer} from "./set_html_lexer";

/**@type {typeof handle_set_lexer}*/
export function html_lexer_ipc_call(fn,arg_arr) {
	console.log('ipc call',fn,arg_arr);
	switch(fn) {
		case 'set_lexer': {
			set_html_lexer(arg_arr[0]);
		} break;
	}
}
