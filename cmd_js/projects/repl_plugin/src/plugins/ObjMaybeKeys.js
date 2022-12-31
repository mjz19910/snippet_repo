import {BrowserPluginData} from "./BrowserPluginIndexType.js";

export class ObjMaybeKeys {
	/**@type {"keys"|"no_keys"} */
	type="no_keys";
	/** @type {string[]} */
	arr=[];
	/** @arg {BrowserPluginData} value */
	constructor(value) {
		this.value=value;
	}
	/** @arg {string} key */
	update(key) {
		if(this.type!=="keys")
			this.type="keys";
		this.arr.push(key);
	}
	/** @arg {keyof BrowserPluginData} name */
	get_from_store(name) {
		switch(this.type) {
			case 'keys': {
				let nx=name;
				switch(nx) {
					case 'window': return this.value[nx];
					default: console.log('case needed for',name);
				}
			} throw new Error();
			case 'no_keys': throw new Error();
			default: throw 1;
		}
	}
}
