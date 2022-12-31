export class Report {
	/** @type {any[]} */
	report_contents = [];
	/** @arg {any[]} value */
	add(value) {
		this.report_contents.push(value);
	}
	get new() {
		let report_gen = (/** @type {ReadonlyArray<string>} */ e, /** @type {[]} */ ...ex) => {
			this.add(['template', e, ex]);
			return report_gen;
		};
		report_gen.obj = this;
		report_gen.build = () => {
			this.report_contents;
		};
		return report_gen;
	}
}
