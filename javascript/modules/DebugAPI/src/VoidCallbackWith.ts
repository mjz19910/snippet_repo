export class VoidCallback<U extends any[],C> {
	m_callback;
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	/** @param {U} args */
	execute(...args: U) {
		return this.m_callback(...args);
	}
}

export type VoidCallbackWith<T extends (...args: any[]) => any>=VoidCallback<Parameters<T>, ReturnType<T>>;
