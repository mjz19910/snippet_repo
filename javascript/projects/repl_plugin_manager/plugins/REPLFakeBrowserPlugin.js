import {REPLPlugin} from "./mod.js";
/**
 * @arg {REPLFakeBrowserPlugin['obj']} st
 * @param {string} name
 */
function get_from_store(st, name) {
	if(!st) return null;
	switch(st.type) {
		case 'keys':
			let nx = name;
			switch(nx) {
				case 'window': return st.value[nx];
			}
			console.log('case needed for', name);
		case 'no-keys':
	}
	return null;
}
class REPLFakeBrowserPlugin extends REPLPlugin {
	/**@type {{type:"no-keys", arr:[],value:BrowserPluginIndexType}|{type:"keys", arr:string[], value:BrowserPluginIndexType}|null}*/
	obj = null;
	enable() {
		// TODO get fake passed in to us
		// this.repl.context.get_fake_window = () => fake.window;
		// this.repl.context.get_fake_document = () => fake.document;
		let get_from_store_bound = get_from_store.bind(null, this.obj);
		this.repl.context.get_from_store = get_from_store_bound;
	}
	/**
	 * @param {string} key
	 */
	update_stored_keys(key) {
		if(!this.obj) return;
		this.obj = {
			type: 'keys',
			arr: [...this.obj.arr, key],
			value: this.obj.value,
		};
	}
	/**
	 * @param {BrowserPluginIndexType} object
	 */
	set_object_store(object) {
		this.obj = {
			type: 'no-keys',
			arr: [],
			value: object
		};
	}
}
export function get_plugin() {
	return REPLFakeBrowserPlugin;
}
