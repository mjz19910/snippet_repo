/** @template {any[]} U @template C */

export class VoidCallback<U extends any[],C> {
	/** @type {(...args: U)=>C} */
	m_callback: ((...args: U) => C);
	/** @arg {(...args: U)=>C} callback */
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args: U) {
		return this.m_callback(...args);
	}
}
