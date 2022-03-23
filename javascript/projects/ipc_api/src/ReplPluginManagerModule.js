import {handle_failed_import} from "./handle_failed_import";
import {state, g_loaded_ipc_plugins} from "./mod";
import {try_import_module} from "./try_import_module";
export class ReplPluginManagerModule {
	/**@arg {"repl_plugin_manager/mod.js"}name@arg {"direct"}opt*/
	static async import_plugin(name, opt) {name; opt; return ReplPluginManagerModule;}
	/**
	 * @arg {"repl_plugin_manager/mod.js@direct"} load_key
	 * @arg {"../../repl_plugin_manager/mod.js"} path
	 * @param {"repl_plugin_manager/mod.js"} name
	 * @param {"direct"} opt
	 */
	static async import_ipc_plugin(name, opt, load_key, path) {
		state.depth++;
		let mod = null;
		try {
			mod = await try_import_module(load_key, path);
		} catch(e) {
			/**@type {[typeof name, typeof opt]} */
			let retry_args = [name, opt];
			await handle_failed_import(e, retry_args);
			if(g_loaded_ipc_plugins.has(load_key)) {
				return g_loaded_ipc_plugins.get(load_key);
			} else {
				throw new Error("Handling error did not load plugin");
			}
		} finally {
			state.depth--;
		}
		return mod;
	}
}
