export class UniqueIdGenerator {
	constructor() {
		this.m_current = -1;
	}
	/**
	 * @param {number} current_value
	 */
	set_current(current_value) {
		this.m_current = current_value;
	}
	current() {
		return this.m_current;
	}
	next() {
		return this.m_current++;
	}
}
