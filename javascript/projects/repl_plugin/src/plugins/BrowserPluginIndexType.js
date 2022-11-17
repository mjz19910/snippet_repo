import {FakeWindow} from "../../browser_fake_dom/index.js";

export class BrowserPluginData {
	window;
	/**@arg {FakeWindow} window */
	constructor(window) {
		this.window=window;
	}
}
