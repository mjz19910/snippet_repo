import {g_loaded_ipc_plugin_map} from "./g_loaded_ipc_plugin_map.js"
/**
 * @param {string} plugin_key
 * @param {string} module_path
 */
export async function try_import_module(plugin_key,module_path) {
	let mod=await import(module_path)
	g_loaded_ipc_plugin_map.set(plugin_key,mod)
	return mod
}
