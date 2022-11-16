import {g_reload_command_plugin} from "../commands/g_reload_command_plugin.js";
import {REPLPlugin} from "./REPLPlugin.js";

export class REPLCommandsPlugin extends REPLPlugin {
	enable() {
		if(!this.repl.repl_active) {
			this.repl.update(this.state);
			console.log('command plugin enable');
			this.repl.activate();
			this.repl.defineCommand("reload",g_reload_command_plugin);
		}
	}
}
