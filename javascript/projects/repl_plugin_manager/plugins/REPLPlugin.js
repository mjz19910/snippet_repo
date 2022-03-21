import {FetchRequestState} from "../../js_browser_tiny/mod.js";
import {repl_activator} from "../mod.js";
export class REPLPlugin {
	/** @param {repl_activator} repl @param {FetchRequestState} state */
	constructor(repl, state) {
		this.repl = repl;
		this.state = state;
	}
	enable() {}
}
export function use_types(){
	repl_activator;
}
