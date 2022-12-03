export class GenericEvent {
	default_prevented=false;
	type='unknown';
	/**@param {string} type */
	constructor(type) {
		this.type=type;
	}
	preventDefault() {
		this.default_prevented=true;
	}
	get defaultPrevented() {
		return this.default_prevented;
	}
}
