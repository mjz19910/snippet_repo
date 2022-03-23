import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {do_html_lex_step} from "./do_html_lex_step.js";
import {g_state} from "./static_state.js";
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
			case g_state.Data: Data(state); break;
			case g_state.RCDATA: RCDATA(state); break;
			case g_state.RAWTEXT: RAWTEXT(state); break;
			case g_state.ScriptData: ScriptData(state); break;
			case g_state.PLAINTEXT: PLAINTEXT(state); break;
			case g_state.TagOpen: TagOpen(state); break;
			case g_state.EndTagOpen: EndTagOpen(state); break;
			case g_state.TagName: TagName(state); break;
			case g_state.RCDATALessThanSign: RCDATALessThanSign(state); break;
			case g_state.RCDATAEndTagOpen: RCDATAEndTagOpen(state); break;
			case g_state.RCDATAEndTagName: RCDATAEndTagName(state); break;
			case g_state.RAWTEXTLessThanSign: RAWTEXTLessThanSign(state); break;
			case g_state.RAWTEXTEndTagOpen: RAWTEXTEndTagOpen(state); break;
			case g_state.RAWTEXTEndTagName: RAWTEXTEndTagName(state); break;
			case g_state.ScriptDataLessThanSign: ScriptDataLessThanSign(state); break;
			case g_state.ScriptDataEndTagOpen: ScriptDataEndTagOpen(state); break;
			case g_state.ScriptDataEndTagName: ScriptDataEndTagName(state); break;
			case g_state.ScriptDataEscapeStart: ScriptDataEscapeStart(state); break;
			case g_state.ScriptDataEscapeStartDash: ScriptDataEscapeStartDash(state); break;
			case g_state.ScriptDataEscaped: ScriptDataEscaped(state); break;
			case g_state.ScriptDataEscapedDash: ScriptDataEscapedDash(state); break;
			case g_state.ScriptDataEscapedDashDash: ScriptDataEscapedDashDash(state); break;
			case g_state.ScriptDataEscapedLessThanSign: ScriptDataEscapedLessThanSign(state); break;
			case g_state.ScriptDataEscapedEndTagOpen: ScriptDataEscapedEndTagOpen(state); break;
			case g_state.ScriptDataEscapedEndTagName: ScriptDataEscapedEndTagName(state); break;
			case g_state.ScriptDataDoubleEscapeStart: ScriptDataDoubleEscapeStart(state); break;
			case g_state.ScriptDataDoubleEscaped: ScriptDataDoubleEscaped(state); break;
			case g_state.ScriptDataDoubleEscapedDash: ScriptDataDoubleEscapedDash(state); break;
			case g_state.ScriptDataDoubleEscapedDashDash: ScriptDataDoubleEscapedDashDash(state); break;
			case g_state.ScriptDataDoubleEscapedLessThanSign: ScriptDataDoubleEscapedLessThanSign(state); break;
			case g_state.ScriptDataDoubleEscapeEnd: ScriptDataDoubleEscapeEnd(state); break;
			case g_state.BeforeAttributeName: BeforeAttributeName(state); break;
			case g_state.AttributeName: AttributeName(state); break;
			case g_state.AfterAttributeName: AfterAttributeName(state); break;
			case g_state.BeforeAttributeValue: BeforeAttributeValue(state); break;
			case g_state.AttributeValueDoubleQuoted: AttributeValueDoubleQuoted(state); break;
			case g_state.AttributeValueSingleQuoted: AttributeValueSingleQuoted(state); break;
			case g_state.AttributeValueUnquoted: AttributeValueUnquoted(state); break;
			case g_state.AfterAttributeValueQuoted: AfterAttributeValueQuoted(state); break;
			case g_state.SelfClosingStartTag: SelfClosingStartTag(state); break;
			case g_state.BogusComment: BogusComment(state); break;
			case g_state.MarkupDeclarationOpen: MarkupDeclarationOpen(state); break;
			case g_state.CommentStart: CommentStart(state); break;
			case g_state.CommentStartDash: CommentStartDash(state); break;
			case g_state.Comment: lexerComment(state); break;
			case g_state.CommentLessThanSign: CommentLessThanSign(state); break;
			case g_state.CommentLessThanSignBang: CommentLessThanSignBang(state); break;
			case g_state.CommentLessThanSignBangDash: CommentLessThanSignBangDash(state); break;
			case g_state.CommentLessThanSignBangDashDash: CommentLessThanSignBangDashDash(state); break;
			case g_state.CommentEndDash: CommentEndDash(state); break;
			case g_state.CommentEnd: CommentEnd(state); break;
			case g_state.CommentEndBang: CommentEndBang(state); break;
			case g_state.DOCTYPE: DOCTYPE(state); break;
			case g_state.BeforeDOCTYPEName: BeforeDOCTYPEName(state); break;
			case g_state.DOCTYPEName: DOCTYPEName(state); break;
			case g_state.AfterDOCTYPEName: AfterDOCTYPEName(state); break;
			case g_state.AfterDOCTYPEPublicKeyword: AfterDOCTYPEPublicKeyword(state); break;
			case g_state.BeforeDOCTYPEPublicIdentifier: BeforeDOCTYPEPublicIdentifier(state); break;
			case g_state.DOCTYPEPublicIdentifierDoubleQuoted: DOCTYPEPublicIdentifierDoubleQuoted(state); break;
			case g_state.DOCTYPEPublicIdentifierSingleQuoted: DOCTYPEPublicIdentifierSingleQuoted(state); break;
			case g_state.AfterDOCTYPEPublicIdentifier: AfterDOCTYPEPublicIdentifier(state); break;
			case g_state.BetweenDOCTYPEPublicAndSystemIdentifiers: BetweenDOCTYPEPublicAndSystemIdentifiers(state); break;
			case g_state.AfterDOCTYPESystemKeyword: AfterDOCTYPESystemKeyword(state); break;
			case g_state.BeforeDOCTYPESystemIdentifier: BeforeDOCTYPESystemIdentifier(state); break;
			case g_state.DOCTYPESystemIdentifierDoubleQuoted: DOCTYPESystemIdentifierDoubleQuoted(state); break;
			case g_state.DOCTYPESystemIdentifierSingleQuoted: DOCTYPESystemIdentifierSingleQuoted(state); break;
			case g_state.AfterDOCTYPESystemIdentifier: AfterDOCTYPESystemIdentifier(state); break;
			case g_state.BogusDOCTYPE: BogusDOCTYPE(state); break;
			case g_state.CDATASection: CDATASection(state); break;
			case g_state.CDATASectionBracket: CDATASectionBracket(state); break;
			case g_state.CDATASectionEnd: CDATASectionEnd(state); break;
			case g_state.CharacterReference: CharacterReference(state); break;
			case g_state.NamedCharacterReference: NamedCharacterReference(state); break;
			case g_state.AmbiguousAmpersand: AmbiguousAmpersand(state); break;
			case g_state.NumericCharacterReference: NumericCharacterReference(state); break;
			case g_state.HexadecimalCharacterReferenceStart: HexadecimalCharacterReferenceStart(state); break;
			case g_state.DecimalCharacterReferenceStart: DecimalCharacterReferenceStart(state); break;
			case g_state.HexadecimalCharacterReference: HexadecimalCharacterReference(state); break;
			case g_state.DecimalCharacterReference: DecimalCharacterReference(state); break;
			case g_state.NumericCharacterReferenceEnd: NumericCharacterReferenceEnd(state); break;
		}
		console.log(state.i, state.cur_char);
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
