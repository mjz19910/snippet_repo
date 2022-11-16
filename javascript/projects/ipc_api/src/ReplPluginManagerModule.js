import {handle_failed_import} from "./handle_failed_import";
import {state,g_loaded_ipc_plugins} from "./mod";
import {try_import_module} from "./try_import_module";
export class ReplPluginManagerModule {
	static async import_plugin() {
		return ReplPluginManagerModule;
	}
	/**
	 * @arg {"repl_plugin_manager/mod.js"} load_key
	 * @arg {"../../repl_plugin_manager/mod.js"} path
	 */
	static async import_ipc_plugin(load_key,path) {
		state.depth++;
		let mod=null;
		try {
			mod=await try_import_module(load_key,path);
		} catch(e) {
			await handle_failed_import(e,[load_key]);
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
