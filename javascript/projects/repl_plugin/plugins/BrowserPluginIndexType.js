import {FakeWindow} from "../../browser_fake_dom/index.js";

export class BrowserPluginIndexType {
	window;
	/**@arg {FakeWindow|null} window */
	constructor(window) {
		if(window!=null) {
			this.window=window
		}
	}
}
