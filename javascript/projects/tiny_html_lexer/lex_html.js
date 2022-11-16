import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {State} from "./State.js";
import {state_to_string} from "./state_to_string";
export const abc_chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const num_chars="0123456789";
/**@type {number[]}*/
export const ok_char_int8s=[];
export const h_enc={
	raquo: [187],
	nbsp: [160],
	copy: [169],
	amp: [38],
};
/**@arg {any} v @returns {any}*/
export function any(v) {
	return v;
}
/**
 * @param {Uint8Array} html
 */
export function lex_html(html) {
	let lexer=new HTMLLexerState(html);
	var document_root=new NodeInternalData('root',0,[],null);
	/**@type {0|1|2}*/
	lexer.lex_mode=0;
	lexer.is_in_tag_attrs=false;
	lexer.is_in_tag_content=true;
	lexer.is_in_script_tag=false;
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	lexer.lex_arr=[];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(lexer.i=0;lexer.i<lexer.html.length;lexer.i++) {
		lexer.cur_lex=lexer.html[lexer.i];
		lexer.cur_char=lexer.dec(lexer.i,1);
		switch(lexer.m_current_state) {
			case State.AfterAttributeName: {
				let vv=true;
				if(vv) {
					throw new Error(`State (${state_to_string(lexer.m_current_state)}) not implemented.`);
				}
			} break;
			default: throw new Error(`State (${state_to_string(lexer.m_current_state)}) not implemented.`);
		}
		console.log(lexer.i,lexer.cur_char);
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex|HTMLTagLex)[]} */
	let elements=[];
	for(let i=0;i<lexer.lex_arr.length;i++) {
		let item=lexer.lex_arr[i];
		switch(item.type) {
			case 'data': elements.push(item); break;
			case 'special':
				throw new Error("Not implemented yet");
		}
	}
	return {
		lex_arr: lexer.lex_arr,
		elements,
		document_root
	};
}

export function use_types() {
	return [
		js_type_html_lex_arr,
	];
}
