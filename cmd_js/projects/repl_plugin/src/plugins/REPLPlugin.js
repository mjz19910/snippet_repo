import {ReplPluginManager} from "../ReplPluginManager.js";

export class REPLPlugin {
	/** @arg {ReplPluginManager} repl */
	constructor(repl) {
		this.repl=repl;
	}
	enable() {}
}
