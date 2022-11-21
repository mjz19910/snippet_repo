import {IpcLoader} from "./nice_loader.js";

const debug=false;

let g_loaded_ipc_plugins=new Map;

class ReplPluginManagerModule {
	/** @param {IpcLoader} state @param {string} key @param {string} module_path */
	static import_ipc_plugin(state,key,module_path) {
		console.log("TODO use args",state,key);
		return import(module_path);
	}
}

/** @arg {IpcLoader} state @arg {string} plugin_key */
export async function import_ipc_plugin(state,plugin_key) {
	switch(plugin_key) {
		case 'repl_plugin_manager/mod.js': {
			/**@type {`../../${typeof plugin_key}`}*/
			const module_page_loader_str=`../../${plugin_key}`;
			return await ReplPluginManagerModule.import_ipc_plugin(state,plugin_key,module_page_loader_str);
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
		let mod=await import(`../../${plugin_key}/ipc_index.js`);
		return mod;
	} catch(error) {
		console.log('failed to import',plugin_key);
		console.log("TODO: compile *.ts files");
		return;
		/* if(g_loaded_ipc_plugins.has(plugin_key)) {
			return g_loaded_ipc_plugins.get(plugin_key);
		} else {
			throw new Error("Handling error did not load plugin");
		} */
	} finally {
		state.depth--;
	}
}