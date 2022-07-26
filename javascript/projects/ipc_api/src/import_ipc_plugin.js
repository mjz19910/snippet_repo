import {handle_failed_import} from "./handle_failed_import.js"
import {g_loaded_ipc_plugins,state} from "./mod.js"
import {ReplPluginManagerModule} from "./ReplPluginManagerModule.js"
import {TinyHtmlLexerModule} from "./TinyHtmlLexerModule.js"
import {TinyHtmlParserModule} from "./TinyHtmlParserModule.js"
import {try_import_module} from "./try_import_module.js"
const debug=false
/**
 * @type {typeof TinyHtmlLexerModule['import_plugin']&typeof TinyHtmlParserModule['import_plugin']&typeof ReplPluginManagerModule['import_plugin']}
 */
export const import_ipc_plugin= /**@arg {Parameters<typeof TinyHtmlLexerModule['import_plugin']>|Parameters<typeof TinyHtmlParserModule['import_plugin']>|Parameters<typeof ReplPluginManagerModule['import_plugin']>} args*/async function import_ipc_plugin(...args) {
	const name=args[0]
	const opt=args[1]??"default"
	let module_page_loader_str=`../../${name}/ipc_plugin/ipc_mod.js`
	/**@readonly*/
	let plugin_key=`${name}@${opt}`
	if(opt==='direct') {
		module_page_loader_str=`../../${name}`
	}
	switch(args[0]) {
		case 'repl_plugin_manager/mod.js': {
			const name=args[0]
			const opt=args[1]??"direct"
			/**@type {`../../${typeof name}`}*/
			const module_page_loader_str=`../../${name}`
			/**@type {`${typeof name}@${typeof opt}`}*/
			let plugin_key=`${name}@${opt}`
			return await ReplPluginManagerModule.import_ipc_plugin(name,opt,plugin_key,module_page_loader_str)
		}
		case 'tiny_html_lexer': break
		case 'tiny_html_parser': break
		default: throw new Error("No types for "+args[0]+"@"+args[1])
	}
	if(g_loaded_ipc_plugins.has(plugin_key)) {
		return g_loaded_ipc_plugins.get(plugin_key)
	}
	if(debug) console.log('imp depth',state.depth)
	state.depth++
	try {
		let mod=await try_import_module(plugin_key,module_page_loader_str)
		return mod
	} catch(e) {
		await handle_failed_import(e,args)
		if(g_loaded_ipc_plugins.has(plugin_key)) {
			return g_loaded_ipc_plugins.get(plugin_key)
		} else {
			throw new Error("Handling error did not load plugin")
		}
	} finally {
		state.depth--
	}
}