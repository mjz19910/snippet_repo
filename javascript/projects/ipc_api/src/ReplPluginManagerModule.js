import {handle_failed_import} from "./handle_failed_import.js";
import {IpcLoader} from "./ipc_loader_state.js";
import {g_loaded_ipc_plugin_map} from "./g_loaded_ipc_plugin_map.js";
import {try_import_module} from "./try_import_module.js";

export class ReplPluginManagerModule {
	static async import_plugin() {
		return ReplPluginManagerModule;
	}
	/**
	 * @arg {IpcLoader} state
	 * @arg {"repl_plugin_manager/mod.js"} load_key
	 * @arg {"../../repl_plugin_manager/mod.js"} path
	 */
	static async import_ipc_plugin(state,load_key,path) {
		state.depth++;
		let mod=null;
		try {
			mod=await try_import_module(load_key,path);
		} catch(e) {
			await handle_failed_import(state,e,load_key);
			if(g_loaded_ipc_plugin_map.has(load_key)) {
				return g_loaded_ipc_plugin_map.get(load_key);
			} else {
				throw new Error("Handling error did not load plugin");
			}
		} finally {
			state.depth--;
		}
		return mod;
	}
}
