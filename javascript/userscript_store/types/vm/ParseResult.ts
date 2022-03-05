import {ParseTree} from "./ParseTree";
export class ParseResult {
	m_is_ok = false;
	ok(): this is {parse_tree: ParseTree} {
		return this.m_is_ok;
	}
	/**@returns {boolean} */
	has_parse_error(): boolean {
		if(!this.parse_errors)
			throw new Error("Invalid");
		if(this.parse_errors.length > 0) {
			return true;
		}
		return false;
	}
	/**@returns {boolean} */
	has_early_error(): boolean {
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
	parse_tree: ParseTree | undefined;
	/**@type {SyntaxError[]|undefined} */
	parse_errors: SyntaxError[] | undefined;
	/**@type {SyntaxError[]|undefined} */
	early_errors: SyntaxError[] | undefined;
}
