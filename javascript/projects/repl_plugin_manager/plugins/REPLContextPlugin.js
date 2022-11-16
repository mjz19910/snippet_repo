import {any} from "../../browser_fake_dom/src/any.1.js";
import {make_reload_page_handler as make_reload_page_request_handler} from "../../page_loader/make_reload_page_handler.js"
import {PageLoaderFetchRequestState} from "../../page_loader/PageLoaderFetchRequestState.js";
import {eval_script} from "../detail/eval.js"
import {async_import} from "../detail/import.js"
import {get_dom_state} from "../get_dom_state.js"
import {get_vars} from "../get_vars.js"
import {REPLPlugin} from "./REPLPlugin.js";

class InitPluginContext {
	get_vars;
	get_dom_state;
	import_module;
	do_eval_script;
	reload() {}
}

export function get_plugin() {
	return class REPLContextPlugin extends REPLPlugin {
		enable() {
			/**@type {InitPluginContext} */
			let ctx=any(this.repl.context);
			ctx.get_vars=get_vars
			ctx.get_dom_state=get_dom_state
			ctx.import_module=async_import
			ctx.do_eval_script=eval_script
			/**@type {PageLoaderFetchRequestState} */
			let real_state=any(this.state);
			ctx.reload=make_reload_page_request_handler(real_state);
		}
	}
}