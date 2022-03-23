import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {do_html_lex_step} from "./do_html_lex_step.js";
import {static_lexer_states} from "./static_state.js";
import {lexer_data_state} from "./lexer_data_state";
import {lexer_rc_data_state} from "./lexer_rc_data_state";
import {lexer_raw_text} from "./lexer_raw_text";
import {lexer_script_data} from "./lexer_script_data";
export const abc_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
/**
 * @param {Uint8Array} html
 */
export function lex_html(html) {
	let state = new HTMLLexerState(html);
	var document_root = new NodeInternalData('root', 0, [], null);
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
		state.cur_char = state.dec(state.i, 1);
		switch(state.current_state) {
			case static_lexer_states.Data: lexer_data_state(state); break;
			case static_lexer_states.RCDATA: lexer_rc_data_state(state); break;
			case static_lexer_states.RAWTEXT: lexer_raw_text(state); break;
			case static_lexer_states.ScriptData: lexer_script_data(state); break;
			case static_lexer_states.PLAINTEXT: break;
			case static_lexer_states.TagOpen: break;
			case static_lexer_states.EndTagOpen: break;
			case static_lexer_states.TagName: break;
			case static_lexer_states.RCDATALessThanSign: break;
			case static_lexer_states.RCDATAEndTagOpen: break;
			case static_lexer_states.RCDATAEndTagName: break;
			case static_lexer_states.RAWTEXTLessThanSign: break;
			case static_lexer_states.RAWTEXTEndTagOpen: break;
			case static_lexer_states.RAWTEXTEndTagName: break;
			case static_lexer_states.ScriptDataLessThanSign: break;
			case static_lexer_states.ScriptDataEndTagOpen: break;
			case static_lexer_states.ScriptDataEndTagName: break;
			case static_lexer_states.ScriptDataEscapeStart: break;
			case static_lexer_states.ScriptDataEscapeStartDash: break;
			case static_lexer_states.ScriptDataEscaped: break;
			case static_lexer_states.ScriptDataEscapedDash: break;
			case static_lexer_states.ScriptDataEscapedDashDash: break;
			case static_lexer_states.ScriptDataEscapedLessThanSign: break;
			case static_lexer_states.ScriptDataEscapedEndTagOpen: break;
			case static_lexer_states.ScriptDataEscapedEndTagName: break;
			case static_lexer_states.ScriptDataDoubleEscapeStart: break;
			case static_lexer_states.ScriptDataDoubleEscaped: break;
			case static_lexer_states.ScriptDataDoubleEscapedDash: break;
			case static_lexer_states.ScriptDataDoubleEscapedDashDash: break;
			case static_lexer_states.ScriptDataDoubleEscapedLessThanSign: break;
			case static_lexer_states.ScriptDataDoubleEscapeEnd: break;
			case static_lexer_states.BeforeAttributeName: break;
			case static_lexer_states.AttributeName: break;
			case static_lexer_states.AfterAttributeName: break;
			case static_lexer_states.BeforeAttributeValue: break;
			case static_lexer_states.AttributeValueDoubleQuoted: break;
			case static_lexer_states.AttributeValueSingleQuoted: break;
			case static_lexer_states.AttributeValueUnquoted: break;
			case static_lexer_states.AfterAttributeValueQuoted: break;
			case static_lexer_states.SelfClosingStartTag: break;
			case static_lexer_states.BogusComment: break;
			case static_lexer_states.MarkupDeclarationOpen: break;
			case static_lexer_states.CommentStart: break;
			case static_lexer_states.CommentStartDash: break;
			case static_lexer_states.Comment: break;
			case static_lexer_states.CommentLessThanSign: break;
			case static_lexer_states.CommentLessThanSignBang: break;
			case static_lexer_states.CommentLessThanSignBangDash: break;
			case static_lexer_states.CommentLessThanSignBangDashDash: break;
			case static_lexer_states.CommentEndDash: break;
			case static_lexer_states.CommentEnd: break;
			case static_lexer_states.CommentEndBang: break;
			case static_lexer_states.DOCTYPE: break;
			case static_lexer_states.BeforeDOCTYPEName: break;
			case static_lexer_states.DOCTYPEName: break;
			case static_lexer_states.AfterDOCTYPEName: break;
			case static_lexer_states.AfterDOCTYPEPublicKeyword: break;
			case static_lexer_states.BeforeDOCTYPEPublicIdentifier: break;
			case static_lexer_states.DOCTYPEPublicIdentifierDoubleQuoted: break;
			case static_lexer_states.DOCTYPEPublicIdentifierSingleQuoted: break;
			case static_lexer_states.AfterDOCTYPEPublicIdentifier: break;
			case static_lexer_states.BetweenDOCTYPEPublicAndSystemIdentifiers: break;
			case static_lexer_states.AfterDOCTYPESystemKeyword: break;
			case static_lexer_states.BeforeDOCTYPESystemIdentifier: break;
			case static_lexer_states.DOCTYPESystemIdentifierDoubleQuoted: break;
			case static_lexer_states.DOCTYPESystemIdentifierSingleQuoted: break;
			case static_lexer_states.AfterDOCTYPESystemIdentifier: break;
			case static_lexer_states.BogusDOCTYPE: break;
			case static_lexer_states.CDATASection: break;
			case static_lexer_states.CDATASectionBracket: break;
			case static_lexer_states.CDATASectionEnd: break;
			case static_lexer_states.CharacterReference: break;
			case static_lexer_states.NamedCharacterReference: break;
			case static_lexer_states.AmbiguousAmpersand: break;
			case static_lexer_states.NumericCharacterReference: break;
			case static_lexer_states.HexadecimalCharacterReferenceStart: break;
			case static_lexer_states.DecimalCharacterReferenceStart: break;
			case static_lexer_states.HexadecimalCharacterReference: break;
			case static_lexer_states.DecimalCharacterReference: break;
			case static_lexer_states.NumericCharacterReferenceEnd: break;
		}
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

