export class EventHandlerDispatch {
	/**
	 * @param {{[x:string]:any}} target_obj
	 * @param {string} target_name
	 */
	constructor(target_obj, target_name) {
		this.target_obj = target_obj;
		this.target_name = target_name;
	}
	/**
	 * @param {any} event
	 */
	handleEvent(event) {
		this.target_obj[this.target_name](event);
	}
}
