export class IntervalTarget {
	/**
	 * @param {any} obj
	 * @param {any} callback
	 */
	constructor(obj, callback) {
		this.m_once = false;
		this.m_obj = obj;
		this.m_callback = callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
