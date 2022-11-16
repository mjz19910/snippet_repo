import {ReplLocalState} from "../ReplLocalState.js";
import {ReplPluginReplSupport} from "../ReplPluginReplSupport.js";

export class REPLPlugin {
	/** @param {ReplPluginReplSupport} repl @param {ReplLocalState} state */
	constructor(repl,state) {
		this.repl=repl;
		this.state=state;
	}
	enable() {}
}
