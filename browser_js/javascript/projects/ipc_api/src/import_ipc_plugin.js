import {handle_failed_import} from "./handle_failed_import.js";
import {IpcLoader} from "./ipc_loader_state.js";
import {g_loaded_ipc_plugin_map} from "./g_loaded_ipc_plugin_map.js";
import {try_import_module} from "./try_import_module.js";
import {Extern} from "./use_extern.js";

/** @arg {IpcLoader} state @arg {string} plugin_key */
export async function import_ipc_plugin(state,plugin_key) {
	switch(plugin_key) {
		case 'repl_plugin_manager': break;
		case 'tiny_html_lexer': break;
		case 'tiny_html_parser': break;
		default: throw new Error("No types for "+plugin_key);
	}
	if(g_loaded_ipc_plugin_map.has(plugin_key)) {
		return g_loaded_ipc_plugin_map.get(plugin_key);
	}
	if(Extern.debug) console.log('imp depth',state.depth);
	state.depth++;
	try {
		let mod=await try_import_module(plugin_key,"../"+`../${plugin_key}/ipc_index.js`);
		return mod;
	} catch(error) {
		await handle_failed_import(state,error,plugin_key);
		if(g_loaded_ipc_plugin_map.has(plugin_key)) {
			return g_loaded_ipc_plugin_map.get(plugin_key);
		} else {
			throw new Error("Handling error did not load plugin");
		}
	} finally {
		state.depth--;
	}
}
