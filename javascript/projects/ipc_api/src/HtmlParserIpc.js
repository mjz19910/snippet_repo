export class HtmlParserIpc {
	/**@arg {"none"} arg @arg {[]} args */
	static ipc_call(arg,args) {
		console.log('html_parser ipc',arg,args);
	}
	static async import_plugin() {
		return HtmlParserIpc;
	}
}
