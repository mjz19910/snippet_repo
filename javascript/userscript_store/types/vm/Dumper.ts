export class Dumper {
	/**@type {null} */
	m_dump_value = null
	/**
	 * @param {null} value
	 */
	dump_value(value) {
		this.m_dump_value = value
		this.m_dump_value = null
	}
}
