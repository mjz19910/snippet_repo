import {lex_double_quote_string} from "./lex_double_quote_string.js";
import {lex_special} from "./lex_special.js";
import {lex_data} from "./lex_data.js";
import {NodeInternalData} from "../../NodeInternalData.js";
import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {lex_tag_open} from "./lex_tag_open.js";
import {lex_line_cr} from "./lex_line_cr.js";
import {HTMLTagLex} from "./box/HTMLTagLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {lex_single_quote_string} from "./lex_single_quote_string";
/**
 * @param {string} html
 */
export function lex_html(html) {
	var document_root = new NodeInternalData('root', 0, [], null);
	/**@type {0|1|2}*/
	let lex_mode = 0;
	/**@type {(HTMLSpecialLex|HTMLDataLex)[]} */
	let lex_arr = [];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(let i = 0; i < html.length; i++) {
		let cur_lex = html[i];
		if(lex_arr.at(-3)?.value === "<" && lex_arr.at(-1)?.value === ">") {
			if(lex_arr.at(-2)?.value.trim().startsWith("script")) {
				let next = html.indexOf('</script>', i);
				if(next > -1) {
					lex_arr.push({type: "data", value: ""});
					lex_data(lex_arr, html.slice(i, next));
					i = next - 1;
				}
				continue;
			} else if(lex_arr.at(-2)?.value.trim().startsWith("style")) {
				let next = html.indexOf('</style>', i);
				if(next > -1) {
					lex_arr.push({type: "data", value: ""});
					lex_data(lex_arr, html.slice(i, next));
					i = next - 1;
				}
				continue;
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
		switch(cur_lex) {
			case '\r': lex_line_cr(lex_arr, html, i); continue;
			case '\n':
			case '>':
			case '/': lex_special(lex_arr, cur_lex); continue;
			case '"': lex_data(lex_arr, cur_lex); lex_mode = 1; continue;
			case '<': lex_inc = lex_tag_open(lex_arr, html, i); i += lex_inc; continue;
			case "'": lex_data(lex_arr, cur_lex);lex_mode = 2;break;
		}
		lex_data(lex_arr, cur_lex);
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
