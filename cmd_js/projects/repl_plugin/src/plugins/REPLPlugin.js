import {ReplPluginManager} from "../ReplPluginManager.js";

export class REPLPlugin {
	/** @param {ReplPluginManager} repl*/
	constructor(repl) {
		this.repl=repl;
	}
	enable() {}
}
