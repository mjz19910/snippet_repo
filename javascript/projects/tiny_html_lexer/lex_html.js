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
import {lexerData as Data} from "./lexerData";
import {lexerRCDATA as RCDATA} from "./lexerRCDATA";
import {lexerRAWTEXT as RAWTEXT} from "./lexerRAWTEXT";
import {lexerScriptData as ScriptData} from "./lexerScriptData";
import {TagOpen} from "./TagOpen";
import {EndTagOpen} from "./EndTagOpen";
import {TagName} from "./TagName";
import {RCDATALessThanSign} from "./RCDATALessThanSign";
import {RCDATAEndTagOpen} from "./RCDATAEndTagOpen";
import {PLAINTEXT} from "./PLAINTEXT";
import {RCDATAEndTagName} from "./RCDATAEndTagName";
import {RAWTEXTLessThanSign} from "./RAWTEXTLessThanSign";
import {RAWTEXTEndTagOpen} from "./RAWTEXTEndTagOpen";
import {RAWTEXTEndTagName} from "./RAWTEXTEndTagName";
import {ScriptDataLessThanSign} from "./ScriptDataLessThanSign";
import {ScriptDataEndTagOpen} from "./ScriptDataEndTagOpen";
import {ScriptDataEndTagName} from "./ScriptDataEndTagName";
import {ScriptDataEscapedLessThanSign} from "./ScriptDataEscapedLessThanSign";
import {ScriptDataEscapedDashDash} from "./ScriptDataEscapedDashDash";
import {ScriptDataEscapeStart} from "./ScriptDataEscapeStart";
import {ScriptDataEscaped} from "./ScriptDataEscaped";
import {ScriptDataEscapedDash} from "./ScriptDataEscapedDash";
import {ScriptDataEscapeStartDash} from "./ScriptDataEscapeStartDash";
import {ScriptDataEscapedEndTagOpen} from "./ScriptDataEscapedEndTagOpen";
import {ScriptDataEscapedEndTagName} from "./ScriptDataEscapedEndTagName";
import {ScriptDataDoubleEscapeStart} from "./ScriptDataDoubleEscapeStart";
import {ScriptDataDoubleEscaped} from "./ScriptDataDoubleEscaped";
import {ScriptDataDoubleEscapedDash} from "./ScriptDataDoubleEscapedDash";
import {ScriptDataDoubleEscapeEnd} from "./ScriptDataDoubleEscapeEnd";
import {BeforeAttributeName} from "./BeforeAttributeName";
import {AttributeName} from "./AttributeName";
import {AfterAttributeName} from "./AfterAttributeName";
import {BeforeAttributeValue} from "./BeforeAttributeValue";
import {AttributeValueDoubleQuoted} from "./AttributeValueDoubleQuoted";
import {AttributeValueSingleQuoted} from "./AttributeValueSingleQuoted";
import {AttributeValueUnquoted} from "./AttributeValueUnquoted";
import {AfterAttributeValueQuoted} from "./AfterAttributeValueQuoted";
import {SelfClosingStartTag} from "./SelfClosingStartTag";
import {BogusComment} from "./BogusComment";
import {MarkupDeclarationOpen} from "./MarkupDeclarationOpen";
import {CommentStart} from "./CommentStart";
import {CommentStartDash} from "./CommentStartDash";
import {CommentLessThanSign} from "./CommentLessThanSign";
import {CommentLessThanSignBang} from "./CommentLessThanSignBang";
import {CommentLessThanSignBangDash} from "./CommentLessThanSignBangDash";
import {CommentLessThanSignBangDashDash} from "./CommentLessThanSignBangDashDash";
import {CommentEndDash} from "./CommentEndDash";
import {CommentEnd} from "./CommentEnd";
import {CommentEndBang} from "./CommentEndBang";
import {DOCTYPE} from "./DOCTYPE";
import {BeforeDOCTYPEName} from "./BeforeDOCTYPEName";
import {DOCTYPEName} from "./DOCTYPEName";
import {AfterDOCTYPEName} from "./AfterDOCTYPEName";
import {AfterDOCTYPEPublicKeyword} from "./AfterDOCTYPEPublicKeyword";
import {BeforeDOCTYPEPublicIdentifier} from "./BeforeDOCTYPEPublicIdentifier";
import {DOCTYPEPublicIdentifierDoubleQuoted} from "./DOCTYPEPublicIdentifierDoubleQuoted";
import {DOCTYPEPublicIdentifierSingleQuoted} from "./DOCTYPEPublicIdentifierSingleQuoted";
import {AfterDOCTYPEPublicIdentifier} from "./AfterDOCTYPEPublicIdentifier";
import {BetweenDOCTYPEPublicAndSystemIdentifiers} from "./BetweenDOCTYPEPublicAndSystemIdentifiers";
import {AfterDOCTYPESystemKeyword} from "./AfterDOCTYPESystemKeyword";
import {BeforeDOCTYPESystemIdentifier} from "./BeforeDOCTYPESystemIdentifier";
import {DOCTYPESystemIdentifierDoubleQuoted} from "./DOCTYPESystemIdentifierDoubleQuoted";
import {DOCTYPESystemIdentifierSingleQuoted} from "./DOCTYPESystemIdentifierSingleQuoted";
import {AfterDOCTYPESystemIdentifier} from "./AfterDOCTYPESystemIdentifier";
import {BogusDOCTYPE} from "./BogusDOCTYPE";
import {CDATASectionBracket} from "./CDATASectionBracket";
import {CDATASectionEnd} from "./CDATASectionEnd";
import {CharacterReference} from "./CharacterReference";
import {NamedCharacterReference} from "./NamedCharacterReference";
import {AmbiguousAmpersand} from "./AmbiguousAmpersand";
import {NumericCharacterReference} from "./NumericCharacterReference";
import {HexadecimalCharacterReferenceStart} from "./HexadecimalCharacterReferenceStart";
import {DecimalCharacterReferenceStart} from "./DecimalCharacterReferenceStart";
import {HexadecimalCharacterReference} from "./HexadecimalCharacterReference";
import {DecimalCharacterReference} from "./DecimalCharacterReference";
import {NumericCharacterReferenceEnd} from "./NumericCharacterReferenceEnd";
import {ScriptDataDoubleEscapedDashDash} from "./ScriptDataDoubleEscapedDashDash";
import {ScriptDataDoubleEscapedLessThanSign} from "./ScriptDataDoubleEscapedLessThanSign";
import {lexerComment} from "./lexerComment";
import {CDATASection} from "./CDATASection";
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
			case static_lexer_states.Data: Data(state); break;
			case static_lexer_states.RCDATA: RCDATA(state); break;
			case static_lexer_states.RAWTEXT: RAWTEXT(state); break;
			case static_lexer_states.ScriptData: ScriptData(state); break;
			case static_lexer_states.PLAINTEXT: PLAINTEXT(state); break;
			case static_lexer_states.TagOpen: TagOpen(state); break;
			case static_lexer_states.EndTagOpen: EndTagOpen(state); break;
			case static_lexer_states.TagName: TagName(state); break;
			case static_lexer_states.RCDATALessThanSign: RCDATALessThanSign(state); break;
			case static_lexer_states.RCDATAEndTagOpen: RCDATAEndTagOpen(state); break;
			case static_lexer_states.RCDATAEndTagName: RCDATAEndTagName(state); break;
			case static_lexer_states.RAWTEXTLessThanSign: RAWTEXTLessThanSign(state); break;
			case static_lexer_states.RAWTEXTEndTagOpen: RAWTEXTEndTagOpen(state); break;
			case static_lexer_states.RAWTEXTEndTagName: RAWTEXTEndTagName(state); break;
			case static_lexer_states.ScriptDataLessThanSign: ScriptDataLessThanSign(state); break;
			case static_lexer_states.ScriptDataEndTagOpen: ScriptDataEndTagOpen(state); break;
			case static_lexer_states.ScriptDataEndTagName: ScriptDataEndTagName(state); break;
			case static_lexer_states.ScriptDataEscapeStart: ScriptDataEscapeStart(state); break;
			case static_lexer_states.ScriptDataEscapeStartDash: ScriptDataEscapeStartDash(state); break;
			case static_lexer_states.ScriptDataEscaped: ScriptDataEscaped(state); break;
			case static_lexer_states.ScriptDataEscapedDash: ScriptDataEscapedDash(state); break;
			case static_lexer_states.ScriptDataEscapedDashDash: ScriptDataEscapedDashDash(state); break;
			case static_lexer_states.ScriptDataEscapedLessThanSign: ScriptDataEscapedLessThanSign(state); break;
			case static_lexer_states.ScriptDataEscapedEndTagOpen: ScriptDataEscapedEndTagOpen(state); break;
			case static_lexer_states.ScriptDataEscapedEndTagName: ScriptDataEscapedEndTagName(state); break;
			case static_lexer_states.ScriptDataDoubleEscapeStart: ScriptDataDoubleEscapeStart(state); break;
			case static_lexer_states.ScriptDataDoubleEscaped: ScriptDataDoubleEscaped(state); break;
			case static_lexer_states.ScriptDataDoubleEscapedDash: ScriptDataDoubleEscapedDash(state); break;
			case static_lexer_states.ScriptDataDoubleEscapedDashDash: ScriptDataDoubleEscapedDashDash(state); break;
			case static_lexer_states.ScriptDataDoubleEscapedLessThanSign: ScriptDataDoubleEscapedLessThanSign(state); break;
			case static_lexer_states.ScriptDataDoubleEscapeEnd: ScriptDataDoubleEscapeEnd(state); break;
			case static_lexer_states.BeforeAttributeName: BeforeAttributeName(state); break;
			case static_lexer_states.AttributeName: AttributeName(state); break;
			case static_lexer_states.AfterAttributeName: AfterAttributeName(state); break;
			case static_lexer_states.BeforeAttributeValue: BeforeAttributeValue(state); break;
			case static_lexer_states.AttributeValueDoubleQuoted: AttributeValueDoubleQuoted(state); break;
			case static_lexer_states.AttributeValueSingleQuoted: AttributeValueSingleQuoted(state); break;
			case static_lexer_states.AttributeValueUnquoted: AttributeValueUnquoted(state); break;
			case static_lexer_states.AfterAttributeValueQuoted: AfterAttributeValueQuoted(state); break;
			case static_lexer_states.SelfClosingStartTag: SelfClosingStartTag(state); break;
			case static_lexer_states.BogusComment: BogusComment(state); break;
			case static_lexer_states.MarkupDeclarationOpen: MarkupDeclarationOpen(state); break;
			case static_lexer_states.CommentStart: CommentStart(state); break;
			case static_lexer_states.CommentStartDash: CommentStartDash(state); break;
			case static_lexer_states.Comment: lexerComment(state); break;
			case static_lexer_states.CommentLessThanSign: CommentLessThanSign(state); break;
			case static_lexer_states.CommentLessThanSignBang: CommentLessThanSignBang(state); break;
			case static_lexer_states.CommentLessThanSignBangDash: CommentLessThanSignBangDash(state); break;
			case static_lexer_states.CommentLessThanSignBangDashDash: CommentLessThanSignBangDashDash(state); break;
			case static_lexer_states.CommentEndDash: CommentEndDash(state); break;
			case static_lexer_states.CommentEnd: CommentEnd(state); break;
			case static_lexer_states.CommentEndBang: CommentEndBang(state); break;
			case static_lexer_states.DOCTYPE: DOCTYPE(state); break;
			case static_lexer_states.BeforeDOCTYPEName: BeforeDOCTYPEName(state); break;
			case static_lexer_states.DOCTYPEName: DOCTYPEName(state); break;
			case static_lexer_states.AfterDOCTYPEName: AfterDOCTYPEName(state); break;
			case static_lexer_states.AfterDOCTYPEPublicKeyword: AfterDOCTYPEPublicKeyword(state); break;
			case static_lexer_states.BeforeDOCTYPEPublicIdentifier: BeforeDOCTYPEPublicIdentifier(state); break;
			case static_lexer_states.DOCTYPEPublicIdentifierDoubleQuoted: DOCTYPEPublicIdentifierDoubleQuoted(state); break;
			case static_lexer_states.DOCTYPEPublicIdentifierSingleQuoted: DOCTYPEPublicIdentifierSingleQuoted(state); break;
			case static_lexer_states.AfterDOCTYPEPublicIdentifier: AfterDOCTYPEPublicIdentifier(state); break;
			case static_lexer_states.BetweenDOCTYPEPublicAndSystemIdentifiers: BetweenDOCTYPEPublicAndSystemIdentifiers(state); break;
			case static_lexer_states.AfterDOCTYPESystemKeyword: AfterDOCTYPESystemKeyword(state); break;
			case static_lexer_states.BeforeDOCTYPESystemIdentifier: BeforeDOCTYPESystemIdentifier(state); break;
			case static_lexer_states.DOCTYPESystemIdentifierDoubleQuoted: DOCTYPESystemIdentifierDoubleQuoted(state); break;
			case static_lexer_states.DOCTYPESystemIdentifierSingleQuoted: DOCTYPESystemIdentifierSingleQuoted(state); break;
			case static_lexer_states.AfterDOCTYPESystemIdentifier: AfterDOCTYPESystemIdentifier(state); break;
			case static_lexer_states.BogusDOCTYPE: BogusDOCTYPE(state); break;
			case static_lexer_states.CDATASection: CDATASection(state); break;
			case static_lexer_states.CDATASectionBracket: CDATASectionBracket(state); break;
			case static_lexer_states.CDATASectionEnd: CDATASectionEnd(state); break;
			case static_lexer_states.CharacterReference: CharacterReference(state); break;
			case static_lexer_states.NamedCharacterReference: NamedCharacterReference(state); break;
			case static_lexer_states.AmbiguousAmpersand: AmbiguousAmpersand(state); break;
			case static_lexer_states.NumericCharacterReference: NumericCharacterReference(state); break;
			case static_lexer_states.HexadecimalCharacterReferenceStart: HexadecimalCharacterReferenceStart(state); break;
			case static_lexer_states.DecimalCharacterReferenceStart: DecimalCharacterReferenceStart(state); break;
			case static_lexer_states.HexadecimalCharacterReference: HexadecimalCharacterReference(state); break;
			case static_lexer_states.DecimalCharacterReference: DecimalCharacterReference(state); break;
			case static_lexer_states.NumericCharacterReferenceEnd: NumericCharacterReferenceEnd(state); break;
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
