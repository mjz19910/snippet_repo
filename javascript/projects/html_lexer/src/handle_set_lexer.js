import {set_html_lexer} from "./set_html_lexer";

/**@arg {"set_lexer"} fn_key @arg {[HTMLLexerAPI]} val */
function handle_set_lexer(fn_key,val) {
	if(fn_key!=="set_lexer")
		throw new Error("Invalid ipc call");
	set_html_lexer(val[0]);
}
