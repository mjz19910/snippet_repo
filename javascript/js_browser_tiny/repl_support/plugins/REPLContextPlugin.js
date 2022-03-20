import {make_reload_page_handler} from "../../page_loader/make_reload_page_handler.js";
import {eval_script} from "../detail/eval.js";
import {async_import} from "../detail/import.js";
import {get_dom_state} from "../get_dom_state.js";
import {get_vars} from "../get_vars.js";
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