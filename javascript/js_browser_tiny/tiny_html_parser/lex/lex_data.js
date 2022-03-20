import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
/**
 * @type {string[]}
 */
const cc_map=[];
/**
 * @arg {(ReturnType<typeof js_type_html_lex_arr)[]} arr
 * @param {number} x
 */
export function lex_data(arr, x) {
	let last = arr.at(-1);
	if(last && last.type === 'data') {
		if(cc_map[x]){
			last.value += cc_map[x];
			return;
		}
		cc_map[x] = String.fromCharCode(x);
		last.value += cc_map[x];
	} else {
		if(!cc_map[x]){
			cc_map[x] = String.fromCharCode(x);
		}
		arr.push({
			type: "data",
			value: cc_map[x],
		});
	}
}
