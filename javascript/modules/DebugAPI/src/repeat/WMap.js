import {Repeat} from "./Repeat.js";

/**@template T */
export class WMap {
	/**
	 * @param {Map<number, Map<number, Repeat<T>>>} map
	 */
	constructor(map) {
		this.value=map;
	}
}
