import {get_repl_activator} from "../../page_loader/get_repl_activator.js";

export class ReloadCommand {
	/**
	 * @param {import("../ReplLocalState.js").ReplLocalState} state
	 */
	run_action(state) {
		console.log("no action", state);
	};
	/**
	 * @param {any} state
	 */
	action(state) {
		let repl=get_repl_activator(state);
		repl.clearBufferedCommand();
		this.run_action(repl.m_request_state);
		repl.displayPrompt();
	}
	/**
	 * @param {(state: {}) => void} target_function
	 */
	set_target_action(target_function) {
		this.run_action=target_function;
	}
}
