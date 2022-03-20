import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";

/**
 * @arg {(HTMLSpecialLex|HTMLDataLex)[]} arr
 * @param {string} x
 */
export function lex_data(arr, x) {
	let last = arr.at(-1);
	if(last && last.type === 'data') {
		last.value += x;
	} else {
		arr.push({
			type: "data",
			value: x
		});
	}
}
