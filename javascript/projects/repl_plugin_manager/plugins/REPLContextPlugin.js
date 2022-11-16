import {any} from "../../browser_fake_dom/src/any.js";
import {make_reload_page_request_handler} from "../../page_loader/make_reload_page_request_handler.js"
import {PageLoaderState} from "../../page_loader/PageLoaderState.js";
import {eval_script} from "../detail/eval.js"
import {async_import} from "../detail/import.js"
import {get_dom_state} from "../get_dom_state.js"
import {get_vars} from "../get_vars.js"
import {REPLPlugin} from "./REPLPlugin.js";

class InitPluginContext {
	/**
	 * @type {() => { get_dom_state: () => { request?: {} | undefined; }; }}
	 */
	get_vars() {
		return {
			/**@returns {{ request?: {} | undefined; }} */
			get_dom_state() {
				return {};
			}
		};
	};
	get_dom_state() {
		return {};
	};
	/**
	 * @type {(mod: string) => Promise<any>}
	 */
	async import_module() {};
	/**
	 * @type {(e: string) => any}
	 */
	do_eval_script(string) {};
	reload() {}
}

export class REPLContextPlugin extends REPLPlugin {
	enable() {
		/**@type {InitPluginContext} */
		let ctx=any(this.repl.context);
		ctx.get_vars=get_vars
		ctx.get_dom_state=get_dom_state
		ctx.import_module=async_import
		ctx.do_eval_script=eval_script
		/**@type {PageLoaderState} */
		let real_state=any(this.repl.m_request_state);
		ctx.reload=make_reload_page_request_handler(real_state);
	}
}

export function get_context_plugin() {
	return REPLContextPlugin;
}