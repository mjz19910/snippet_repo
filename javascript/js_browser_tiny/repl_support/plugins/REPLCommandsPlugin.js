import {ReloadCommand} from "../commands/ReloadCommand.js";
import {REPLPlugin} from "./mod.js";
export function get_plugin() {
	return class REPLCommandsPlugin extends REPLPlugin {
		enable() {
			if(!this.repl.repl_active) {
				this.repl.update(this.state);
				console.log('command plugin enable');
				this.repl.activate();
				this.repl.defineCommand("reload", new ReloadCommand);
			}
		}
	}
}
