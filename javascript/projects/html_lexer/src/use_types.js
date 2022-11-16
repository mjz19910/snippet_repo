import {g_html_lex_plugin} from "./g_html_lex_plugin.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin/repl_plugin_get_global_repl_activator.js";
import {REPLHtmlLexPlugin} from "./plugin/REPLHtmlLexPlugin.js";
import {on_html_lex_result} from "./mod.js";


export function use_types() {
	return [
		// for on_html_lex_result
		on_html_lex_result,
		repl_plugin_get_global_repl_activator,
		g_html_lex_plugin,
		REPLHtmlLexPlugin,
	];
}
