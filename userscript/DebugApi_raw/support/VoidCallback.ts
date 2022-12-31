export class VoidCallback<U extends any[],C> {
	m_callback: ((...args: U) => C);
	constructor(callback: (...args: U) => C) {
		this.m_callback=callback;
	}
	execute(...args: U) {
		return this.m_callback(...args);
	}
}
