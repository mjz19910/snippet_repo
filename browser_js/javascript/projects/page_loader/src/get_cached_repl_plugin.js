import {PageLoaderState} from "./PageLoaderState.js";
import {Extern as E} from "./use_extern.js";

/**@arg {PageLoaderState} state */
export function get_cached_repl_plugin(state) {
	if(E.g_repl_plugin_value.value===null) {
		E.g_repl_plugin_value.value=new E.ReplPluginManager(state);
	}
	return E.g_repl_plugin_value.value;
}
