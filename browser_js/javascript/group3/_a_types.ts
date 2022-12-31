import {as_cast} from "../group2/item_05.js";
import {ParseJsState} from "./_deparsejs.js";
// cspell:ignore deparsejs

export function test_fn() {
	let parama=new ParseJsState(as_cast({}),as_cast({})).tok;
	let item=parama[0];
	return {
		/** @type {"Function"} */
		value: "Function",
		head: parama.slice(1),
		named: true,
		item,
	};
}
