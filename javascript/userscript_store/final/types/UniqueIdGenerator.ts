export class UniqueIdGenerator {
	m_current;
	constructor(start: number) {
		this.m_current = start;
	}
	set_current(current_value: number) {
		this.m_current = current_value;
	}
	current() {
		return this.m_current;
	}
	next() {
		return this.m_current++;
	}
}
