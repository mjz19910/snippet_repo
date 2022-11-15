
export class VoidCallback {
	/**
	 * @param {()=>void} callback
	 */
	constructor(callback) {
		this.m_cb=callback;
	}
	execute() {
		this.m_cb();
	}
}
