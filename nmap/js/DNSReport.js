export class DNSReportSeq {
	constructor() {
		/** @type {readonly string[]|null} */
		this.m_from = null;
		/** @type {readonly string[]|null} */
		this.m_to = null;
		/** @type {readonly string[]|null} */
		this.m_all = null;
	}
	/** @arg {string|readonly string[]} value */
	fmt(value) {
		this.m_format = value;
		return this;
	}
	/** @arg {readonly string[]} value */
	to(value) {
		this.m_to = value;
		return this;
	}
	/** @arg {readonly string[]} value */
	from(value) {
		this.m_from = value;
		return this;
	}
	/** @arg {readonly string[]} value */
	all(value) {
		this.m_all = value;
		return this;
	}
}
export class DNSReport {
	/** @type {(DNSReportSeq|string)[]} */
	contents = [];
	/** @arg {DNSReportSeq|string} value */
	append(value) {
		this.contents.push(value);
		return this;
	}
	/** @arg {readonly string[]} value */
	raw(value) {
		this.contents.push(value.join(""));
	}
}
