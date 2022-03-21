export class Result {
	/**@readonly*/
	type = "result";
	has_value() {
		return false;
	}
	/**@returns {false}*/
	is_cast_result() {
		return false;
	}
	/**@returns {{}} */
	release_value() {
		throw new Error("Not implemented");
	}
}
