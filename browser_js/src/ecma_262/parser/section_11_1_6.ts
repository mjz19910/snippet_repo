import {do_parse_to_goal_symbol} from "./do_parse_to_goal_symbol.js";
import {List} from "./List.js";
import {ParseNode} from "./ParseNode.js";
import {ParseResult} from "./ParseResult.js";
import {GoalSymbol} from "./ParseScript.js";

// https://tc39.es/ecma262/#sec-parsetext
export function ParseText(sourceText: string,goalSymbol: GoalSymbol): ParseNode|List<SyntaxError[]> {
	// 11.1.6 Static Semantics: ParseText
	let parse_tree_root=null;
	//1. Attempt to parse sourceText using goalSymbol as the goal symbol,
	//   and analyse the parse result for any early error conditions.
	//   Parsing and early error detection may be interleaved in an implementation-defined manner.
	let parse_result: ParseResult=do_parse_to_goal_symbol(sourceText,goalSymbol);
	// 2. If the parse succeeded and no early errors were found,
	//    return the Parse Node (an instance of goalSymbol) at the root of the parse tree resulting from the parse.
	if(parse_result.ok()&&!parse_result.has_early_error()) {
		parse_tree_root=parse_result.parse_tree.root;
		return new ParseNode(goalSymbol,parse_tree_root);
	} else {
		// 3. Otherwise, return a List of one or more SyntaxError objects representing the parsing errors and/or early errors.
		if(ParseResult.has_parse_error(parse_result.parse_errors)) {
			return new List(parse_result.parse_errors);
		}
		// 3.2 If more than one parsing error or early error is present,
		//      the number and ordering of error objects in the list is implementation-defined,
		//      but at least one must be present.
		if(ParseResult.has_early_error(parse_result.early_errors)) {
			return new List(parse_result.early_errors);
		}
		throw new Error("Invalid state");
	}
}