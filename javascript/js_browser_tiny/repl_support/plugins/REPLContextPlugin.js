import {get_vars, get_dom_state, make_reload_page_handler} from "preload-context";
import {async_import, eval_script} from "repl-detail";
import {REPLPlugin} from "./mod.js";
export function get_plugin() {
	return class REPLContextPlugin extends REPLPlugin {
		enable() {
			let ctx = this.repl.context;
			ctx.get_vars = get_vars;
			ctx.get_dom_state = get_dom_state;
			ctx.import_module = async_import;
			ctx.do_eval_script = eval_script;
			ctx.reload = make_reload_page_handler(this.state);
		}
	};
}