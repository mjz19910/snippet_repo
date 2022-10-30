export class TimeoutTarget {
	/**
	 * @param {AutoBuyState | AutoBuy | null} obj
	 * @param {()=>void} callback
	 */
	constructor(obj, callback) {
		this.m_once = true;
		this.m_obj = obj;
		this.m_callback = callback;
	}
	fire() {
		this.m_callback.call(this.m_obj);
	}
}
