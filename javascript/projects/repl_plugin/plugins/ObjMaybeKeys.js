import {BrowserPluginIndexType} from "./BrowserPluginIndexType.js";

export class ObjMaybeKeys {
	/**@type {"keys"|"no_keys"} */
	type="no_keys";
	/** @type {string[]} */
	arr=[];
	/** @param {BrowserPluginIndexType} value */
	constructor(value) {
		this.value=value;
	}
	/** @param {string} key */
	update(key) {
		if(this.type!=="keys")
			this.type="keys";
		this.arr.push(key);
	}
}
