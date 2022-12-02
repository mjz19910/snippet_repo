import {Extern} from "../use_extern.js";

export class BrowserPluginData {
	window;
	/**@arg {Extern.FakeWindow} window */
	constructor(window) {
		this.window=window;
	}
}
