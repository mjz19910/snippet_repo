import {fake} from "fake-dom-browse";
import {REPLPlugin} from "./mod.js";
export function get_plugin() {
	return class REPLFakeBrowserPlugin extends REPLPlugin {
		enable() {
			this.repl.context.get_fake_window = () => fake.window;
			this.repl.context.get_fake_document = () => fake.document;
		}
	};
}
