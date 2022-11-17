export class HtmlParserIpc {
	/**@arg {"none"} arg @arg {[]} args */
	static ipc_call(arg,args) {
		console.log('HtmlParserIpc ipc_call',arg,args);
	}
	static async import_plugin() {
		return HtmlParserIpc;
	}
}
