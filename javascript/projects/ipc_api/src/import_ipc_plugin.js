import {debug} from "../../debug.js";
import {handle_failed_import} from "./handle_failed_import.js";
import {g_loaded_ipc_plugins} from "./mod.js";
import {ReplPluginManagerModule} from "./ReplPluginManagerModule.js";
import {try_import_module} from "./try_import_module.js";


/** @param {string} plugin_key */
export async function import_ipc_plugin(plugin_key) {
	switch(plugin_key) {
		case 'repl_plugin_manager/mod.js': {
			/**@type {`../../${typeof plugin_key}`}*/
			const module_page_loader_str=`../../${plugin_key}`;
			return await ReplPluginManagerModule.import_ipc_plugin(plugin_key,module_page_loader_str);
		}
		case 'tiny_html_lexer': break;
		case 'tiny_html_parser': break;
		default: throw new Error("No types for "+plugin_key);
	}
	if(g_loaded_ipc_plugins.has(plugin_key)) {
		return g_loaded_ipc_plugins.get(plugin_key);
	}
	if(debug) console.log('imp depth',state.depth);
	state.depth++;
	try {
		let mod=await try_import_module(plugin_key,`../../${plugin_key}/ipc_index.js`);
		return mod;
	} catch(e) {
		await handle_failed_import(e,args);
		if(g_loaded_ipc_plugins.has(plugin_key)) {
			return g_loaded_ipc_plugins.get(plugin_key);
		} else {
			throw new Error("Handling error did not load plugin");
		}
	} finally {
		state.depth--;
	}
}