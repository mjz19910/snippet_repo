export class CustomInputMatcher {
	/**
	 * @param {any} t_needle
	 * @param {any} t_string_getter
	 */
	constructor(t_needle,t_string_getter) {
		this.ts_get=t_string_getter;
		this.tr=t_needle;
	}
	get test_string() {
		return this.ts_get();
	}
	get test_needle() {
		return this.tr;
	}
}