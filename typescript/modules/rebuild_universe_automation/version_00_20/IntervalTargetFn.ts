export class IntervalTargetFn {
	/**
	 * @param {any} callback
	 * @param {number} timeout
	 */
	constructor(callback, timeout) {
		this.m_callback = callback;
		this.timeout = timeout;
	}
	fire() {
		this.m_callback();
	}
}
