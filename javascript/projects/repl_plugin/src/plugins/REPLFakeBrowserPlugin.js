import {fake} from "../../../browser_fake_dom/index.js";
import {any} from "../any.js";
import {ReplPluginManager} from "../ReplPluginManager.js";
import {BrowserPluginData} from "./BrowserPluginIndexType.js";
import {ObjMaybeKeys} from "./ObjMaybeKeys.js";

export class REPLFakeBrowserPlugin {
	/** @param {ReplPluginManager} repl */
	constructor(repl) {
		this.repl=repl;
	}
	/**@type {ObjMaybeKeys|null}*/
	obj=null;
	enable() {
		if(!this.obj) {
			console.log("enable without obj");
			return;
		}
		this.repl.context.get_fake_window=() => fake.window;
		this.repl.context.get_fake_document=() => fake.document;
		let get_from_store_bound=this.obj.get_from_store.bind(this.obj);
		let ctx=this.wrap_context(this.repl.context);
		ctx.get_from_store=get_from_store_bound;
	}
	/**@arg {import('vm').Context} context @returns {ObjMaybeKeys} */
	wrap_context(context) {
		return any(context);
	}
	/**
	 * @param {string} key
	 */
	update_stored_keys(key) {
		if(!this.obj) return;
		this.obj.update(key);
	}
	/**
	 * @param {BrowserPluginData} object
	 */
	set_object_store(object) {
		this.obj=new ObjMaybeKeys(object);
	}
}
