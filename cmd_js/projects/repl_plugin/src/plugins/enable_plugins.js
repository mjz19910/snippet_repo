import {REPLPlugin} from "./REPLPlugin.js";

/**
 * @param {REPLPlugin[]} list
 */
export function enable_plugins(list) {
	for(let item of list) {
		item.enable();
	}
}
export function use_types() {
	return [
		REPLPlugin,
	];
}