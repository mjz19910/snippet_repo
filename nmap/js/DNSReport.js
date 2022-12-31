import {DNSReportSeq} from "./DNSReportSeq.js";

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
