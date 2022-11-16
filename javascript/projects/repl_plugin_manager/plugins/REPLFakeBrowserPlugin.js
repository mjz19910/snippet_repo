import {ReplLocalState} from "ReplLocalState.js";
import {ReplPluginReplSupport} from "../ReplPluginReplSupport.js";
import {BrowserPluginIndexType} from "./BrowserPluginIndexType.js";
import {get_from_store} from "./get_from_store";

class ObjMaybeKeys {
	/**@type {"keys"|"no_keys"} */
	type="no_keys";
	/** @type {string[]} */
	arr=[];
	/** @param {BrowserPluginIndexType} value */
	constructor(value) {
		this.value=value;
	}
	/** @param {string} key */
	update(key) {
		if(this.type!=="keys") this.type="keys";
		this.arr.push(key);
	}
}

export class REPLFakeBrowserPlugin {
	/** @param {ReplPluginReplSupport} repl @param {ReplLocalState} state */
	constructor(repl,state) {
		this.repl=repl;
		this.state=state;
	}
	/**@type {ObjMaybeKeys|null}*/
	obj=null;
	enable() {
		// TODO get fake passed in to us
		// this.repl.context.get_fake_window = () => fake.window
		// this.repl.context.get_fake_document = () => fake.document
		let get_from_store_bound=get_from_store.bind(null,this.obj);
		this.repl.context.get_from_store=get_from_store_bound;
	}
	/**
	 * @param {string} key
	 */
	update_stored_keys(key) {
		if(!this.obj) return;
		this.obj.update(key);
	}
	/**
	 * @param {BrowserPluginIndexType} object
	 */
	set_object_store(object) {
		this.obj=new ObjMaybeKeys(object);
	}
}
