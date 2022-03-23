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
	const todo_err = new Error("TODO");
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
		switch(state.m_current_state) {
			case static_lexer_states.Data: lexer_data_state(state); break;
			case static_lexer_states.RCDATA: lexer_rc_data_state(state); break;
			case static_lexer_states.RAWTEXT: lexer_raw_text(state); break;
			case static_lexer_states.ScriptData: lexer_script_data(state); break;
			case static_lexer_states.PLAINTEXT: lexer_plain_text(state);break;
			case static_lexer_states.TagOpen: lexer_tag_open(state);break;
			case static_lexer_states.EndTagOpen: lexer_end_tag_open(state);break;
			case static_lexer_states.TagName: lexer_tag_name(state);break;
			case static_lexer_states.RCDATALessThanSign: lexer_rc_data_less_than_sign(state);break;
			case static_lexer_states.RCDATAEndTagOpen: lexer_rc_data_end_tag_open(state);break;
			case static_lexer_states.RCDATAEndTagName: lexer_rc_data_end_tag_name(state);break;
			case static_lexer_states.RAWTEXTLessThanSign: lexer_raw_text_less_than_sign(state);break;
			case static_lexer_states.RAWTEXTEndTagOpen: lexer_raw_text_end_tag_open(state);break;
			case static_lexer_states.RAWTEXTEndTagName: lexer_raw_text_end_tag_name(state); throw todo_err;
			case static_lexer_states.ScriptDataLessThanSign: script_data_less_than_sign(state);throw todo_err;
			case static_lexer_states.ScriptDataEndTagOpen: throw todo_err;
			case static_lexer_states.ScriptDataEndTagName: throw todo_err;
			case static_lexer_states.ScriptDataEscapeStart: throw todo_err;
			case static_lexer_states.ScriptDataEscapeStartDash: throw todo_err;
			case static_lexer_states.ScriptDataEscaped: throw todo_err;
			case static_lexer_states.ScriptDataEscapedDash: throw todo_err;
			case static_lexer_states.ScriptDataEscapedDashDash: throw todo_err;
			case static_lexer_states.ScriptDataEscapedLessThanSign: throw todo_err;
			case static_lexer_states.ScriptDataEscapedEndTagOpen: throw todo_err;
			case static_lexer_states.ScriptDataEscapedEndTagName: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscapeStart: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscaped: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscapedDash: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscapedDashDash: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscapedLessThanSign: throw todo_err;
			case static_lexer_states.ScriptDataDoubleEscapeEnd: throw todo_err;
			case static_lexer_states.BeforeAttributeName: throw todo_err;
			case static_lexer_states.AttributeName: throw todo_err;
			case static_lexer_states.AfterAttributeName: throw todo_err;
			case static_lexer_states.BeforeAttributeValue: throw todo_err;
			case static_lexer_states.AttributeValueDoubleQuoted: throw todo_err;
			case static_lexer_states.AttributeValueSingleQuoted: throw todo_err;
			case static_lexer_states.AttributeValueUnquoted: throw todo_err;
			case static_lexer_states.AfterAttributeValueQuoted: throw todo_err;
			case static_lexer_states.SelfClosingStartTag: throw todo_err;
			case static_lexer_states.BogusComment: throw todo_err;
			case static_lexer_states.MarkupDeclarationOpen: throw todo_err;
			case static_lexer_states.CommentStart: throw todo_err;
			case static_lexer_states.CommentStartDash: throw todo_err;
			case static_lexer_states.Comment: throw todo_err;
			case static_lexer_states.CommentLessThanSign: throw todo_err;
			case static_lexer_states.CommentLessThanSignBang: throw todo_err;
			case static_lexer_states.CommentLessThanSignBangDash: throw todo_err;
			case static_lexer_states.CommentLessThanSignBangDashDash: throw todo_err;
			case static_lexer_states.CommentEndDash: throw todo_err;
			case static_lexer_states.CommentEnd: throw todo_err;
			case static_lexer_states.CommentEndBang: throw todo_err;
			case static_lexer_states.DOCTYPE: throw todo_err;
			case static_lexer_states.BeforeDOCTYPEName: throw todo_err;
			case static_lexer_states.DOCTYPEName: throw todo_err;
			case static_lexer_states.AfterDOCTYPEName: throw todo_err;
			case static_lexer_states.AfterDOCTYPEPublicKeyword: throw todo_err;
			case static_lexer_states.BeforeDOCTYPEPublicIdentifier: throw todo_err;
			case static_lexer_states.DOCTYPEPublicIdentifierDoubleQuoted: throw todo_err;
			case static_lexer_states.DOCTYPEPublicIdentifierSingleQuoted: throw todo_err;
			case static_lexer_states.AfterDOCTYPEPublicIdentifier: throw todo_err;
			case static_lexer_states.BetweenDOCTYPEPublicAndSystemIdentifiers: throw todo_err;
			case static_lexer_states.AfterDOCTYPESystemKeyword: throw todo_err;
			case static_lexer_states.BeforeDOCTYPESystemIdentifier: throw todo_err;
			case static_lexer_states.DOCTYPESystemIdentifierDoubleQuoted: throw todo_err;
			case static_lexer_states.DOCTYPESystemIdentifierSingleQuoted: throw todo_err;
			case static_lexer_states.AfterDOCTYPESystemIdentifier: throw todo_err;
			case static_lexer_states.BogusDOCTYPE: throw todo_err;
			case static_lexer_states.CDATASection: throw todo_err;
			case static_lexer_states.CDATASectionBracket: throw todo_err;
			case static_lexer_states.CDATASectionEnd: throw todo_err;
			case static_lexer_states.CharacterReference: throw todo_err;
			case static_lexer_states.NamedCharacterReference: throw todo_err;
			case static_lexer_states.AmbiguousAmpersand: throw todo_err;
			case static_lexer_states.NumericCharacterReference: throw todo_err;
			case static_lexer_states.HexadecimalCharacterReferenceStart: throw todo_err;
			case static_lexer_states.DecimalCharacterReferenceStart: throw todo_err;
			case static_lexer_states.HexadecimalCharacterReference: throw todo_err;
			case static_lexer_states.DecimalCharacterReference: throw todo_err;
			case static_lexer_states.NumericCharacterReferenceEnd: throw todo_err;
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

function lexer_tag_open(state) {
	throw new Error("Function not implemented.");
}

function lexer_end_tag_open(state) {
	throw new Error("Function not implemented.");
}

function lexer_tag_name(state) {
	throw new Error("Function not implemented.");
}

function lexer_rc_data_less_than_sign(state) {
	throw new Error("Function not implemented.");
}

function lexer_rc_data_end_tag_open(state) {
	throw new Error("Function not implemented.");
}

function lexer_plain_text(state){
	throw new Error("Function not implemented.");
}

function lexer_rc_data_end_tag_name(state) {
	throw new Error("Function not implemented.");
}
function lexer_raw_text_less_than_sign(state) {
	throw new Error("Function not implemented.");
}

function lexer_raw_text_end_tag_open(state) {
	throw new Error("Function not implemented.");
}

function lexer_raw_text_end_tag_name(state) {
	throw new Error("Function not implemented.");
}

function script_data_less_than_sign(state) {
	throw new Error("Function not implemented.");
}

