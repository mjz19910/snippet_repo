import {TinyHtmlLexerModule} from "./TinyHtmlLexerModule.js"
export class TinyHtmlParserModule {
	/**@type {typeof TinyHtmlParserModule['ipc_set_lexer']}*/
	static ipc_call(arg,args) {
		arg; args
	}
	/**@arg {"set_lexer"} arg @arg {[typeof TinyHtmlLexerModule]} args*/
	static ipc_set_lexer(arg,args) {
		arg; args
	}
	/**@arg {"tiny_html_parser"}name@arg {"default"}opt*/
	static async import_plugin(name,opt) {name; opt; return TinyHtmlParserModule}
}
