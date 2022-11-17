import {BrowserPluginData} from "./BrowserPluginIndexType.js";

export class FakeBrowserPluginContext {
	/**
	 * @arg {keyof BrowserPluginData} name
	 * @returns {BrowserPluginData[keyof BrowserPluginData]} */
	get_from_store(name) {
		throw new Error("Abstract context method");
	};
}
