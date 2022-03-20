import {lex_double_quote_string} from "./lex_double_quote_string.js";
import {lex_special} from "./lex_special.js";
import {lex_data} from "./lex_data.js";
import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {lex_tag_open} from "./lex_tag_open.js";
import {lex_line_cr} from "./lex_line_cr.js";
import {HTMLTagLex} from "./box/HTMLTagLex.js";
import {lex_single_quote_string} from "./lex_single_quote_string";
import {NodeInternalData} from "../../page_loader/NodeInternalData.js";
import {lex_doctype_open} from "./lex_doctype_open";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_html_entity} from "./lex_html_entity";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {HTMLDataLex} from "./box/HTMLDataLex.js";
const abc_arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const num_chars = "0123456789";
const ok_char_int8s = [231];
const h_enc = {
	raquo: [187],
	nbsp: [160],
	copy:[169],
};
/**
 * @param {Uint8Array} html
 * @param {number} i
 * @param {number} off
 */
function gs(html, i, off) {
	return Array.prototype.map.call(html.subarray(i, i + off), e => {
		return String.fromCharCode(e);
	}).join("");
}
/**
 * @param {Uint8Array} html
 */
export function lex_html(html) {
	var document_root = new NodeInternalData('root', 0, [], null);
	/**@type {0|1|2}*/
	let lex_mode = 0;
	let is_in_tag = false;
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	let lex_arr = [];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(let i = 0; i < html.length; i++) {
		let cur_lex = html[i];
		if(html[i - 1] < 128 && ok_char_int8s.includes(cur_lex)) {
			lex_data(lex_arr, cur_lex);
			continue;
		}
		if(html[i - 1] < 128 && cur_lex === 160) {
			lex_data(lex_arr, cur_lex);
			continue;
		}
		if(lex_arr.at(-3)?.value === "<" && lex_arr.at(-1)?.value === ">") {
			if(lex_arr.at(-2)?.value.trim().startsWith("script")) {
				let maybe_script = Buffer.from(html.slice(i, i + '</script>'.length)).toString();
				if(maybe_script !== '</script>') continue;
			} else if(lex_arr.at(-2)?.value.trim().startsWith("style")) {
				let maybe_script = Buffer.from(html.slice(i, i + '</style>'.length)).toString();
				if(maybe_script !== '</style>') continue;
			}
		}
		if(lex_mode === 1) {
			let new_mode = lex_double_quote_string(lex_arr, cur_lex, lex_mode);
			lex_mode = new_mode;
			continue;
		}
		if(lex_mode === 2) {
			let new_mode = lex_single_quote_string(lex_arr, cur_lex, lex_mode);
			lex_mode = new_mode;
			continue;
		}
		let lex_inc;
		let cur_char = Buffer.from(html.subarray(i, i + 1)).toString();
		switch(cur_char) {
			case '\r': lex_line_cr(lex_arr, html, i); break;
			case '\n':
			case '>':
			case '/': lex_special(lex_arr, cur_lex); break;
			case '"': lex_data(lex_arr, cur_lex); lex_mode = 1; break;
			case '<': lex_inc = lex_tag_open(lex_arr, html, i); is_in_tag = true; i += lex_inc; break;
			case "'": lex_data(lex_arr, cur_lex); lex_mode = 2; break;
			case ' ': lex_data(lex_arr, cur_lex); break;
			case '-':
			case '_':
			case '=': lex_data(lex_arr, cur_lex); break;
			case '&': {
				let off = 0;
				// 59 === ";".charCodeAt(0)
				while(html[i + off] !== 59 && i + off < html.length) {
					off++;
				}
				let h_enc_raw = gs(html, i + 1, off - 1);
				let res = false;
				switch(h_enc_raw) {
					case 'copy':
					case 'nbsp':
					case 'raquo':
						let dc = h_enc[h_enc_raw];
						let s = gs(new Uint8Array(dc), 0, dc.length);
						lex_html_entity(lex_arr, s);
						res = true;
						break;
					default: console.log(h_enc_raw);
				}
				if(res) break;
				throw new Error("Handle html enc");
			}
			case ';': lex_data(lex_arr, cur_lex); break;
			case ':': lex_data(lex_arr, cur_lex); break;
			// char code 160 (&nbsp)
			case String.fromCharCode(160): lex_data(lex_arr, cur_lex); break;
			case '.': lex_data(lex_arr, cur_lex); break;
			case '!': if(is_in_tag) {
				x: if(lex_arr.at(-1)?.value === '<') {
					let last = lex_arr.at(-1);
					if(!last) break x;
					last.value += '!';
					break;
				}
				lex_special(lex_arr, cur_lex);
				break;
			}
			default: {
				if(abc_arr.includes(cur_char)) {
					lex_data(lex_arr, cur_lex);
					break;
				}
				if(num_chars.includes(cur_char)) {
					lex_data(lex_arr, cur_lex);
					break;
				}
				let lv = lex_arr.at(-1)?.value;
				x: if(lv !== '<' && lv !== '!') {
					if(lv === '!') {
						let to = lex_arr.at(-2)?.value;
						if(to === '<') {
							break x;
						}
					}
					let as = gs(html, i, 8);
					console.log('lex_html_tag bad else', cur_lex, as);
					console.log('before', gs(html, i - 3, 6));
					console.log('bin', html.subarray(i - 1, i + 4));
					console.log('last seen', lv);
					throw new Error("No");
				}
				let ss_1 = 'doctype';
				if(gs(html, i, ss_1.length) === ss_1) {
					lex_inc = lex_doctype_open(lex_arr);
					i += ss_1.length - 1;
					break;
				};
				let as = gs(html, i, 5);
				console.log('lex_html_tag uhc', cur_lex, as);
				throw new Error("No");
			}
		}
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLTagLex)[]} */
	let elements = [];
	for(let item of lex_arr) {
		switch(item.type) {
			case 'data': elements.push(item); break;
			case 'special': lex_html_special_to_tag(elements, item); break;
		}
	}
	return {
		lex_arr,
		elements,
		document_root
	};
}

export function use_types() {
	return [
		js_type_html_lex_arr,
	];
}