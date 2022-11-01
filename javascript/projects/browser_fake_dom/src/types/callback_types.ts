class DOMTagLoadHandlers {}

class _HTMLState {
	tasks:any[]=[]
	document_impl_root=null
	request_state;
	tag_handlers:DOMTagLoadHandlers|undefined;
	constructor(state:{url:string;no_repl:boolean}|null) {
		this.request_state=state;
	}
}

export type HTMLParserCallback=(...args: [_HTMLState, Uint8Array]) => Promise<{} | null>
