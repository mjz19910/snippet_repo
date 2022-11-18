export class Result {
	/**@readonly*/
	type='result'
	has_value() {
		return false
	}
	/**@returns {{}} */
	release_value() {
		throw new Error("No value")
	}
}
