/** @template {any[]} U @template C */
export class VoidCallback {
	/** @param {(...args: U) => C} callback */
	constructor(callback) {
		this.m_cb=callback;
	}
	/** @param {U} args */
	execute(...args) {
		return this.m_cb(...args);
	}
}
