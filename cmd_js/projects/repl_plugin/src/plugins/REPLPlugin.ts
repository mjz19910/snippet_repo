import {ReplPluginManager} from "../ReplPluginManager.js";

export abstract class REPLPlugin {
	constructor(public repl: ReplPluginManager) {}
	abstract enable(): void;
}
