import {GenericEvent} from "./GenericEvent";

export class GenericDataEvent extends GenericEvent {
	/**
	 * @param {string} type
	 * @param {any} data
	 */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
