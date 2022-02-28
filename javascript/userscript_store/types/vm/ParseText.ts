import {do_parse_to_goal_symbol} from "./do_parse_to_goal_symbol";
import {List} from "./List";
import {ParseNode} from "./ParseNode";
export function ParseText(sourceText: any, goalSymbol: any): ParseNode | List {
	let parse_tree_root = null;
	//1.
	// Attempt to parse sourceText using goalSymbol as the goal symbol,
	//  and analyse the parse result for any early error conditions.
	// Parsing and early error detection may be interleaved in an implementation-defined manner.
	let parse_result:ParseResult = do_parse_to_goal_symbol(sourceText, goalSymbol);
	//2.
	// If the parse succeeded and no early errors were found,
	//  return the Parse Node (an instance of goalSymbol)
	//   at the root of the parse tree resulting from the parse.
	if(parse_result.ok() && !parse_result.has_early_error()) {
		parse_tree_root = parse_result.parse_tree.root;
		return new ParseNode(goalSymbol, parse_tree_root);
	} else {
		//3.
		// Otherwise,
		//  return
		//   a List of one or more SyntaxError objects representing the parsing errors and/or early errors.
		if(parse_result.has_parse_error()) {
			return new List(parse_result.parse_errors);
		}
		//  If more than one parsing error or early error is present,
		//   the number and ordering of error objects in the list is implementation-defined,
		//   but at least one must be present.
		if(parse_result.has_early_error()) {
			return new List(parse_result.early_errors);
		}
		throw "Invalid state";
	}
}
