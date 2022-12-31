export class CustomInputMatcher {
	/** @arg {any} t_needle
	 * @arg {any} t_string_getter
	 * @arg {string} result_name */
	constructor(t_needle,t_string_getter,result_name) {
		this.ts_get=t_string_getter;
		this.tr=t_needle;
		this.result_name=result_name;
	}
	get test_string() {
		return this.ts_get();
	}
	get test_needle() {
		return this.tr;
	}
}
