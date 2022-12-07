import {any} from "../any.js";
import {eval_script} from "../detail/eval.js";
import {async_import} from "../detail/import.js";
import {get_page_loader_dom_state} from "../get_page_loader_dom_state.js";
import {get_vars} from "../get_vars.js";
import {REPLPlugin} from "./REPLPlugin.js";
import {Extern} from "../use_extern.js";

class InitPluginContext {
	get_vars=get_vars;
	get_page_loader_dom_state=get_page_loader_dom_state;
	async_import=async_import;
	/**
	 * @type {(e: string) => any}
	 */
	do_eval_script(string) {
		console.log('do_eval_script',string);
	};
	reload() {}
}

export class REPLContextPlugin extends REPLPlugin {
	enable() {
		/**@type {InitPluginContext} */
		let ctx=any(this.repl.context);
		ctx.get_vars=get_vars;
		ctx.get_page_loader_dom_state=get_page_loader_dom_state;
		ctx.async_import=async_import;
		ctx.do_eval_script=eval_script;
		/**@type {Extern.PageLoaderState} */
		let real_state=any(this.repl.m_request_state);
		ctx.reload=Extern.make_reload_page_request_handler(real_state);
	}
}

export function get_context_plugin() {
	return REPLContextPlugin;
}