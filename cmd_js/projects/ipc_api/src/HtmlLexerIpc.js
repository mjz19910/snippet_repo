export class HtmlLexerIpc {
	/** @arg {"none"} arg @arg {[]} args */
	static ipc_call(arg,args) {
		console.log('HtmlLexerIpc ipc_call',arg,args);
	}
	static async import_plugin() {
		return HtmlLexerIpc;
	}
}
