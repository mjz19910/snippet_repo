/** @template {any[]} U @template C */
export class VoidCallback {
	/** @param {(...args: U) => C} callback */
	constructor(callback) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args) {
		return this.m_callback(...args);
	}
}
