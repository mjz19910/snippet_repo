export class TimeoutTargetFn {
	/**
	 * @param {any} callback
	 * @param {number} timeout
	 */
	constructor(callback, timeout) {
		this.m_once = true;
		this.m_callback = callback;
		this.m_timeout = timeout;
	}
	fire() {
		this.m_callback();
	}
}
