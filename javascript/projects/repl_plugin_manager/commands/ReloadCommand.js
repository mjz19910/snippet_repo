import {fetch_url} from "../../js_browser_tiny/mod.js";
import {get_repl_activator} from "../mod.js";
export class ReloadCommand {
	/**
	 * @this {import("repl").REPLServer}
	 * @param {any} state
	 */
	action(state) {
		this.clearBufferedCommand();
		let repl=get_repl_activator(state);
		if(repl && repl.m_request_state) {
			fetch_url(repl.m_request_state);
		}
		this.displayPrompt();
	}
}
