import {ReplPluginReplSupport} from "../ReplPluginReplSupport.js/index.js"
import {BrowserPluginIndexType} from "./BrowserPluginIndexType.js"
import {get_from_store} from "./get_from_store"
export class REPLFakeBrowserPlugin {
	/** @param {ReplPluginReplSupport} repl @param {{}} state */
	constructor(repl,state) {
		this.repl=repl
		this.state=state
	}
	/**@type {{type:"no-keys", arr:[],value:BrowserPluginIndexType}|{type:"keys", arr:string[], value:BrowserPluginIndexType}|null}*/
	obj=null
	enable() {
		// TODO get fake passed in to us
		// this.repl.context.get_fake_window = () => fake.window
		// this.repl.context.get_fake_document = () => fake.document
		let get_from_store_bound=get_from_store.bind(null,this.obj)
		this.repl.context.get_from_store=get_from_store_bound
	}
	/**
	 * @param {string} key
	 */
	update_stored_keys(key) {
		if(!this.obj) return
		this.obj={
			type: 'keys',
			arr: [...this.obj.arr,key],
			value: this.obj.value,
		}
	}
	/**
	 * @param {BrowserPluginIndexType} object
	 */
	set_object_store(object) {
		this.obj={
			type: 'no-keys',
			arr: [],
			value: object
		}
	}
}
export function get_browser_plugin() {
	return REPLFakeBrowserPlugin
}
