export class Report {
	/** @type {unknown[]} */
	report_contents = [];
	/** @arg {unknown[]} value */
	add(value) {
		this.report_contents.push(value);
	}
	get new() {
		const report_gen = (/** @type {ReadonlyArray<string>} */ e, /** @type {[]} */ ...ex) => {
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
