class ParseResult {
	m_is_ok = false;
	/**@returns {this is {parse_tree:ParseTree}} */
	ok() {
		return this.m_is_ok;
	}
	/**@returns {boolean} */
	has_parse_error() {
		if(!this.parse_errors)
			throw new Error("Invalid");
		if(this.parse_errors.length > 0) {
			return true;
		}
		return false;
	}
	/**@returns {boolean} */
	has_early_error() {
		if(!this.early_errors)
			throw new Error("Invalid");
		if(this.early_errors.length > 0) {
			return true;
		}
		return false;
	}
	/**
	 * @abstract
	 * @type {ParseTree|undefined} */
	parse_tree;
	/**@type {SyntaxError[]|undefined} */
	parse_errors;
	/**@type {SyntaxError[]|undefined} */
	early_errors;
}
