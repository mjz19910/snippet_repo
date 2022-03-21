import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {HTMLTagLex} from "./box/HTMLTagLex.js";
import {NodeInternalData} from "../../page_loader/NodeInternalData.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLEntityLex} from "./box/HTMLEntityLex.js";
import {writeFileSync} from "fs";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {do_html_lex_step} from "./do_html_lex_step.js";
export const abc_arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const num_chars = "0123456789";
/**@type {number[]}*/
export const ok_char_int8s = [];
export const h_enc = {
	raquo: [187],
	nbsp: [160],
	copy: [169],
	amp: [38],
};
/**@arg {any} v @returns {any}*/
export function any(v) {
	return v;
}
export const my_filename = import.meta.url;
/**
 * @param {Uint8Array} html
 */
export function lex_html(html) {
	let state = new HTMLLexerState;
	var document_root = new NodeInternalData('root', 0, [], null);
	state.html=html;
	/**@type {0|1|2}*/
	state.lex_mode = 0;
	state.is_in_tag_attrs = false;
	state.is_in_tag_content = true;
	state.is_in_script_tag = false;
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	state.lex_arr = [];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(state.i = 0; state.i < state.html.length; state.i++) {
		state.cur_lex = state.html[state.i];
		do_html_lex_step(state);
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex|HTMLTagLex)[]} */
	let elements = [];
	for(let i = 0; i < state.lex_arr.length; i++) {
		let item = state.lex_arr[i];
		switch(item.type) {
			case 'data': elements.push(item); break;
			case 'special':
				lex_html_special_to_tag(elements, state.lex_arr, i);
				break;
		}
	}
	return {
		lex_arr: state.lex_arr,
		elements,
		document_root
	};
}

export function use_types() {
	return [
		js_type_html_lex_arr,
	];
}
