import {PageLoaderState} from "../../../page_loader/index.js";
import {g_reload_command_plugin} from "../commands/g_reload_command_plugin.js";
import {REPLPlugin} from "./REPLPlugin.js";

export class REPLCommandsPlugin extends REPLPlugin {
	/** @type {PageLoaderState|null} */
	state=null;
	enable() {
		if(!this.state) console.log("enable command plugin without state");
		if(!this.repl.repl_active&&this.state) {
			this.repl.update(this.state);
			console.log('command plugin enable');
			this.repl.activate();
			this.repl.defineCommand("reload",g_reload_command_plugin);
		}
	}
}
