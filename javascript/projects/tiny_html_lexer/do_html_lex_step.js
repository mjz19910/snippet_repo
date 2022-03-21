import {lex_double_quote_string} from "./lex_double_quote_string.js";
import {lex_special} from "./lex_special.js";
import {lex_data} from "./lex_data.js";
import {lex_tag_open} from "./lex_tag_open.js";
import {lex_line_cr} from "./lex_line_cr.js";
import {lex_single_quote_string} from "./lex_single_quote_string.js";
import {lex_html_entity} from "./lex_html_entity.js";
import {decode_text_ascii} from "./decode_text_ascii.js";
import {lex_html_script_content} from "./lex_html_script_content.js";
import {do_default_html_lex} from "./do_default_html_lex.js";
import {ok_char_int8s, any, h_enc} from "./lex_html.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
/**
 * @param {HTMLLexerState} state
 */
export function do_html_lex_step(state) {
	if(!state.cur_lex) return;
	if(state.html[state.i - 1] < 128 && ok_char_int8s.includes(state.cur_lex)) {
		lex_data(state);
		return;
	}
	if(state.html[state.i - 1] < 128 && state.cur_lex === 160) {
		lex_data(state);
		return;
	}
	if(state.lex_arr.at(-3)?.value === "<" && state.lex_arr.at(-1)?.value === ">") {
		let mid = state.lex_arr.at(-2);
		if(!mid)
			throw new Error("Unreachable");
		if(mid.value.trim().startsWith("script")) {
			console.log('enter script tag', mid);
			lex_html_script_content(state, 'script');
			throw 1;
		}
		if(mid.value.trim().startsWith("style")) {
			console.log('enter style tag', mid);
			lex_html_script_content(state, 'style');
			throw 1;
		}
	}
	if(state.lex_mode === 0) return lex_html_mode_0(state);
	if(state.lex_mode === 1) return lex_double_quote_string(state);
	if(state.lex_mode === 2) return lex_single_quote_string(state);
}
/**@arg {HTMLLexerState}state*/
function lex_html_mode_0(state) {
	let cur_char = state.dec(0, 1);
	switch(cur_char) {
		case ' ':
		case ';': lex_data(state); break;
		case '\n': lex_special(state); break;
		case '\r': lex_line_cr(state.lex_arr, state.html, state.i); break;
		case '>': {
			lex_data(state);
			state.is_in_tag_attrs = false;
			state.is_in_tag_content = true;
		} break;
		case '/':
			if(state.is_in_tag_attrs) {
				lex_data(state);
				break;
			}
			lex_special(state);
			break;
		case '<': {
			lex_tag_open(state);
			state.is_in_tag_content = false;
			state.is_in_tag_attrs = true;
		} break;
		case '"': lex_data(state); state.lex_mode = 1; break;
		case "'": lex_data(state); state.lex_mode = 2; break;
		case '!': {
			if(state.is_in_tag_attrs) {
				let last = state.lex_arr.at(-1);
				if(last && last.value === '<') {
					last.value += cur_char;
					break;
				}
			}
			lex_data(state);
		} break;
		case '&': {
			let off = 0;
			// 59 === ";".charCodeAt(0)
			while(state.html[state.i + off] !== 59 && state.i + off < state.html.length) {
				off++;
			}
			let h_enc_raw = state.dec(1, off - 1);
			/**@type {keyof typeof h_enc} */
			let ksa = any(h_enc_raw);
			if(ksa in h_enc) {
				let dc = h_enc[ksa];
				let s = decode_text_ascii(new Uint8Array(dc), dc.length);
				lex_html_entity(state.lex_arr, s);
				break;
			}
			switch(h_enc_raw) {
				default: {
					if(h_enc_raw.length < 20) {
						console.log('maybe handle entity', h_enc_raw);
					}
				}
			}
			lex_data(state);
			break;
		}
		case '!': {
			if(state.is_in_tag_attrs && state.lex_arr.at(-1)?.value === '<') {
				let last = state.lex_arr.at(-1);
				if(!last) {
					lex_special(state);
					break;
				}
				last.value += '!';
				break;
			}
			lex_data(state);
		} break;
		default: do_default_html_lex(state, cur_char); break;
	}
}
