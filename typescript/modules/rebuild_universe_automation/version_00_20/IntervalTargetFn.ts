export class IntervalTargetFn {
	m_callback: any
	m_timeout: number
	/**
	 * @param {any} callback
	 * @param {number} timeout
	 */
	constructor(callback: any, timeout: number) {
		this.m_callback = callback;
		this.m_timeout = timeout;
	}
	fire() {
		this.m_callback();
	}
}
