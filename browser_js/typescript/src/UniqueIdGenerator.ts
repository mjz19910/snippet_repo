export class UniqueIdGenerator {
	m_current
	constructor() {
		this.m_current=-1
	}
	set_current(current_value: number) {
		this.m_current=current_value
	}
	current() {
		return this.m_current
	}
	next() {
		return this.m_current++
	}
}
