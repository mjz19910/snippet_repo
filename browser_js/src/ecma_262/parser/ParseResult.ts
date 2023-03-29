import {ParseTree} from "./ParseTree.js";

export class ParseResult {
	m_is_ok=false;
	ok(): this is {parse_tree: ParseTree;} {
		return this.m_is_ok;
	}
	static has_parse_error(errors: ParseResult['parse_errors']): errors is any[] {
		if(!errors)
			throw new Error("Invalid");
		if(errors.length>0) {
			return true;
		}
		return false;
	}
	has_early_error() {
		if(ParseResult.has_early_error(this.early_errors)) {
			return true;
		}
		return false;
	}
	static has_early_error(errors: ParseResult['early_errors']): errors is any[] {
		if(!errors)
			throw new Error("Invalid");
		if(errors.length>0) {
			return true;
		}
		return false;
	}
	parse_tree?: ParseTree;
	parse_errors?: SyntaxError[];
	early_errors?: SyntaxError[];
}
