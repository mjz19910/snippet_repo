import {DNSReportSeq} from "./DNSReportSeq.js";

export class DNSReport {
	/**
	 * @type {(DNSReportSeq|string)[]}
	 */
	contents = [];
	/**
	 * @param {DNSReportSeq|string} value
	 */
	append(value) {
		this.contents.push(value);
		return this;
	}
	/**
	 * @param {readonly string[]} value
	 */
	raw(value) {
		this.contents.push(value.join(""));
	}
}
