import {BrowserPluginIndexType} from "./BrowserPluginIndexType.js";

export class FakeBrowserPluginContext {
	/**@type {(name: keyof BrowserPluginIndexType)=>BrowserPluginIndexType[keyof BrowserPluginIndexType]|null} */
	get_from_store=() => {
		throw new Error("Abstract context method");
	};
}
