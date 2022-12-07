import {Extern} from "../use_extern.js";

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
		let repl=Extern.get_cached_repl_plugin(state);
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
