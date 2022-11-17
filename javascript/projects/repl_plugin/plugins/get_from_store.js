import {BrowserPluginIndexType} from "./BrowserPluginIndexType.js";
import {ObjMaybeKeys} from "./ObjMaybeKeys.js";

/**
 * @arg {ObjMaybeKeys} object_store
 * @param {keyof BrowserPluginIndexType} name
 * @returns {BrowserPluginIndexType[keyof BrowserPluginIndexType]|null}
 */
export function get_from_store(object_store,name) {
	switch(object_store.type) {
		case 'keys':
			let nx=name;
			switch(nx) {
				case 'window': return object_store.value[nx];
				default: console.log('case needed for',name);
			}
		case 'no_keys':
	}
	return null;
}
