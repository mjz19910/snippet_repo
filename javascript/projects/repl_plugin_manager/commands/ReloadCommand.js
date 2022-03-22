import {get_repl_activator} from "../mod.js";
/**
 * @type {ReloadCommand | null}
 */
let g_reload_command_plugin = null;
export class ReloadCommand {
	constructor() {
		if(g_reload_command_plugin!== null){
			throw new Error("Tried to construct another singleton")
		}
		g_reload_command_plugin = this;
	}
	/**@type {(state:{})=>void}*/
	run_action=()=>{};
	/**
	 * @this {import("repl").REPLServer}
	 * @param {any} state
	 */
	action(state) {
		this.clearBufferedCommand();
		let repl=get_repl_activator(state);
		if(repl && repl.m_request_state && this) {
			g_reload_command_plugin?.run_action?.(repl.m_request_state);
		}
		this.displayPrompt();
	}
	/**
	 * @param {(state: {}) => void} target_function
	 */
	set_target_action(target_function) {
		this.run_action=target_function;
	}
}
