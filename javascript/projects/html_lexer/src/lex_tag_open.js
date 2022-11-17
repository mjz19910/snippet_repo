import {HTMLTokenizer} from "./HTMLTokenizer.jstxt/index.js";
import {lex_special_raw} from "./lex_special_raw.js";

/** @param {HTMLTokenizer} state */
export function lex_tag_open(state) {
	if(1)
		throw new Error("Not implemented");
	if(state.decode_range(1,1)==='/') {
		if(state.decode_range(2,1)==='>') {
			lex_special_raw(state.lex_arr,"</>");
			state.i+=2;
		} else {
			lex_special_raw(state.lex_arr,"</");
			state.i+=1;
		}
	} else {
		lex_special_raw(state.lex_arr,"<");
	}
}
