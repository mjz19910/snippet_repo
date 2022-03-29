import {lex_html_special_to_tag} from "./lex_html_special_to_tag.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {State} from "./static_state.js";
import {lexerData as Data} from "./lexerData";
import {lexerRCDATA as RCDATA} from "./lexerRCDATA";
import {lexerRAWTEXT as RAWTEXT} from "./lexerRAWTEXT";
import {lexerScriptData as ScriptData} from "./lexerScriptData";
import {TagOpen} from "./lexerTagOpen";
import {EndTagOpen} from "./lexerEndTagOpen";
import {TagName} from "./lexerTagName";
import {RCDATALessThanSign} from "./lexerRCDATALessThanSign";
import {RCDATAEndTagOpen} from "./lexerRCDATAEndTagOpen";
import {PLAINTEXT} from "./lexerPLAINTEXT";
import {RCDATAEndTagName} from "./lexerRCDATAEndTagName";
import {RAWTEXTLessThanSign} from "./lexerRAWTEXTLessThanSign";
import {RAWTEXTEndTagOpen} from "./lexerRAWTEXTEndTagOpen";
import {RAWTEXTEndTagName} from "./lexerRAWTEXTEndTagName";
import {ScriptDataLessThanSign} from "./lexerScriptDataLessThanSign";
import {ScriptDataEndTagOpen} from "./lexerScriptDataEndTagOpen";
import {ScriptDataEndTagName} from "./lexerScriptDataEndTagName";
import {ScriptDataEscapedLessThanSign} from "./lexerScriptDataEscapedLessThanSign";
import {ScriptDataEscapedDashDash} from "./lexerScriptDataEscapedDashDash";
import {ScriptDataEscapeStart} from "./lexerScriptDataEscapeStart";
import {ScriptDataEscaped} from "./lexerScriptDataEscaped";
import {ScriptDataEscapedDash} from "./lexerScriptDataEscapedDash";
import {ScriptDataEscapeStartDash} from "./lexerScriptDataEscapeStartDash";
import {ScriptDataEscapedEndTagOpen} from "./lexerScriptDataEscapedEndTagOpen";
import {ScriptDataEscapedEndTagName} from "./lexerScriptDataEscapedEndTagName";
import {ScriptDataDoubleEscapeStart} from "./lexerScriptDataDoubleEscapeStart";
import {ScriptDataDoubleEscaped} from "./lexerScriptDataDoubleEscaped";
import {ScriptDataDoubleEscapedDash} from "./lexerScriptDataDoubleEscapedDash";
import {ScriptDataDoubleEscapeEnd} from "./lexerScriptDataDoubleEscapeEnd";
import {BeforeAttributeName} from "./lexerBeforeAttributeName";
import {AttributeName} from "./lexerAttributeName";
import {AfterAttributeName} from "./lexerAfterAttributeName";
import {BeforeAttributeValue} from "./lexerBeforeAttributeValue";
import {AttributeValueDoubleQuoted} from "./lexerAttributeValueDoubleQuoted";
import {AttributeValueSingleQuoted} from "./lexerAttributeValueSingleQuoted";
import {AttributeValueUnquoted} from "./lexerAttributeValueUnquoted";
import {AfterAttributeValueQuoted} from "./lexerAfterAttributeValueQuoted";
import {SelfClosingStartTag} from "./lexerSelfClosingStartTag";
import {BogusComment} from "./lexerBogusComment";
import {MarkupDeclarationOpen} from "./lexerMarkupDeclarationOpen";
import {CommentStart} from "./lexerCommentStart";
import {CommentStartDash} from "./lexerCommentStartDash";
import {CommentLessThanSign} from "./lexerCommentLessThanSign";
import {CommentLessThanSignBang} from "./lexerCommentLessThanSignBang";
import {CommentLessThanSignBangDash} from "./lexerCommentLessThanSignBangDash";
import {CommentLessThanSignBangDashDash} from "./lexerCommentLessThanSignBangDashDash";
import {CommentEndDash} from "./lexerCommentEndDash";
import {CommentEnd} from "./lexerCommentEnd";
import {CommentEndBang} from "./lexerCommentEndBang";
import {DOCTYPE} from "./lexerDOCTYPE";
import {BeforeDOCTYPEName} from "./lexerBeforeDOCTYPEName";
import {DOCTYPEName} from "./lexerDOCTYPEName";
import {AfterDOCTYPEName} from "./lexerAfterDOCTYPEName";
import {AfterDOCTYPEPublicKeyword} from "./lexerAfterDOCTYPEPublicKeyword";
import {BeforeDOCTYPEPublicIdentifier} from "./lexerBeforeDOCTYPEPublicIdentifier";
import {DOCTYPEPublicIdentifierDoubleQuoted} from "./lexerDOCTYPEPublicIdentifierDoubleQuoted";
import {DOCTYPEPublicIdentifierSingleQuoted} from "./lexerDOCTYPEPublicIdentifierSingleQuoted";
import {AfterDOCTYPEPublicIdentifier} from "./lexerAfterDOCTYPEPublicIdentifier";
import {BetweenDOCTYPEPublicAndSystemIdentifiers} from "./lexerBetweenDOCTYPEPublicAndSystemIdentifiers";
import {AfterDOCTYPESystemKeyword} from "./lexerAfterDOCTYPESystemKeyword";
import {BeforeDOCTYPESystemIdentifier} from "./lexerBeforeDOCTYPESystemIdentifier";
import {DOCTYPESystemIdentifierDoubleQuoted} from "./lexerDOCTYPESystemIdentifierDoubleQuoted";
import {DOCTYPESystemIdentifierSingleQuoted} from "./lexerDOCTYPESystemIdentifierSingleQuoted";
import {AfterDOCTYPESystemIdentifier} from "./lexerAfterDOCTYPESystemIdentifier";
import {BogusDOCTYPE} from "./lexerBogusDOCTYPE";
import {CDATASectionBracket} from "./lexerCDATASectionBracket";
import {CDATASectionEnd} from "./lexerCDATASectionEnd";
import {CharacterReference} from "./lexerCharacterReference";
import {NamedCharacterReference} from "./lexerNamedCharacterReference";
import {AmbiguousAmpersand} from "./lexerAmbiguousAmpersand";
import {NumericCharacterReference} from "./lexerNumericCharacterReference";
import {HexadecimalCharacterReferenceStart} from "./lexerHexadecimalCharacterReferenceStart";
import {DecimalCharacterReferenceStart} from "./lexerDecimalCharacterReferenceStart";
import {HexadecimalCharacterReference} from "./lexerHexadecimalCharacterReference";
import {DecimalCharacterReference} from "./lexerDecimalCharacterReference";
import {NumericCharacterReferenceEnd} from "./lexerNumericCharacterReferenceEnd";
import {ScriptDataDoubleEscapedDashDash} from "./lexerScriptDataDoubleEscapedDashDash";
import {ScriptDataDoubleEscapedLessThanSign} from "./lexerScriptDataDoubleEscapedLessThanSign";
import {lexerComment} from "./lexerComment";
import {CDATASection} from "./lexerCDATASection";
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
	let lexer = new HTMLLexerState(html);
	var document_root = new NodeInternalData('root', 0, [], null);
	/**@type {0|1|2}*/
	lexer.lex_mode = 0;
	lexer.is_in_tag_attrs = false;
	lexer.is_in_tag_content = true;
	lexer.is_in_script_tag = false;
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	lexer.lex_arr = [];
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(lexer.i = 0; lexer.i < lexer.html.length; lexer.i++) {
		lexer.cur_lex = lexer.html[lexer.i];
		lexer.cur_char = lexer.dec(lexer.i, 1);
		switch(lexer.m_current_state) {
			case State.Data: Data(lexer); break;
			case State.RCDATA: RCDATA(lexer); break;
			case State.RAWTEXT: RAWTEXT(lexer); break;
			case State.ScriptData: ScriptData(lexer); break;
			case State.PLAINTEXT: PLAINTEXT(lexer); break;
			case State.TagOpen: TagOpen(lexer); break;
			case State.EndTagOpen: EndTagOpen(lexer); break;
			case State.TagName: TagName(lexer); break;
			case State.RCDATALessThanSign: RCDATALessThanSign(lexer); break;
			case State.RCDATAEndTagOpen: RCDATAEndTagOpen(lexer); break;
			case State.RCDATAEndTagName: RCDATAEndTagName(lexer); break;
			case State.RAWTEXTLessThanSign: RAWTEXTLessThanSign(lexer); break;
			case State.RAWTEXTEndTagOpen: RAWTEXTEndTagOpen(lexer); break;
			case State.RAWTEXTEndTagName: RAWTEXTEndTagName(lexer); break;
			case State.ScriptDataLessThanSign: ScriptDataLessThanSign(lexer); break;
			case State.ScriptDataEndTagOpen: ScriptDataEndTagOpen(lexer); break;
			case State.ScriptDataEndTagName: ScriptDataEndTagName(lexer); break;
			case State.ScriptDataEscapeStart: ScriptDataEscapeStart(lexer); break;
			case State.ScriptDataEscapeStartDash: ScriptDataEscapeStartDash(lexer); break;
			case State.ScriptDataEscaped: ScriptDataEscaped(lexer); break;
			case State.ScriptDataEscapedDash: ScriptDataEscapedDash(lexer); break;
			case State.ScriptDataEscapedDashDash: ScriptDataEscapedDashDash(lexer); break;
			case State.ScriptDataEscapedLessThanSign: ScriptDataEscapedLessThanSign(lexer); break;
			case State.ScriptDataEscapedEndTagOpen: ScriptDataEscapedEndTagOpen(lexer); break;
			case State.ScriptDataEscapedEndTagName: ScriptDataEscapedEndTagName(lexer); break;
			case State.ScriptDataDoubleEscapeStart: ScriptDataDoubleEscapeStart(lexer); break;
			case State.ScriptDataDoubleEscaped: ScriptDataDoubleEscaped(lexer); break;
			case State.ScriptDataDoubleEscapedDash: ScriptDataDoubleEscapedDash(lexer); break;
			case State.ScriptDataDoubleEscapedDashDash: ScriptDataDoubleEscapedDashDash(lexer); break;
			case State.ScriptDataDoubleEscapedLessThanSign: ScriptDataDoubleEscapedLessThanSign(lexer); break;
			case State.ScriptDataDoubleEscapeEnd: ScriptDataDoubleEscapeEnd(lexer); break;
			case State.BeforeAttributeName: BeforeAttributeName(lexer); break;
			case State.AttributeName: AttributeName(lexer); break;
			case State.AfterAttributeName: AfterAttributeName(lexer); break;
			case State.BeforeAttributeValue: BeforeAttributeValue(lexer); break;
			case State.AttributeValueDoubleQuoted: AttributeValueDoubleQuoted(lexer); break;
			case State.AttributeValueSingleQuoted: AttributeValueSingleQuoted(lexer); break;
			case State.AttributeValueUnquoted: AttributeValueUnquoted(lexer); break;
			case State.AfterAttributeValueQuoted: AfterAttributeValueQuoted(lexer); break;
			case State.SelfClosingStartTag: SelfClosingStartTag(lexer); break;
			case State.BogusComment: BogusComment(lexer); break;
			case State.MarkupDeclarationOpen: MarkupDeclarationOpen(lexer); break;
			case State.CommentStart: CommentStart(lexer); break;
			case State.CommentStartDash: CommentStartDash(lexer); break;
			case State.Comment: lexerComment(lexer); break;
			case State.CommentLessThanSign: CommentLessThanSign(lexer); break;
			case State.CommentLessThanSignBang: CommentLessThanSignBang(lexer); break;
			case State.CommentLessThanSignBangDash: CommentLessThanSignBangDash(lexer); break;
			case State.CommentLessThanSignBangDashDash: CommentLessThanSignBangDashDash(lexer); break;
			case State.CommentEndDash: CommentEndDash(lexer); break;
			case State.CommentEnd: CommentEnd(lexer); break;
			case State.CommentEndBang: CommentEndBang(lexer); break;
			case State.DOCTYPE: DOCTYPE(lexer); break;
			case State.BeforeDOCTYPEName: BeforeDOCTYPEName(lexer); break;
			case State.DOCTYPEName: DOCTYPEName(lexer); break;
			case State.AfterDOCTYPEName: AfterDOCTYPEName(lexer); break;
			case State.AfterDOCTYPEPublicKeyword: AfterDOCTYPEPublicKeyword(lexer); break;
			case State.BeforeDOCTYPEPublicIdentifier: BeforeDOCTYPEPublicIdentifier(lexer); break;
			case State.DOCTYPEPublicIdentifierDoubleQuoted: DOCTYPEPublicIdentifierDoubleQuoted(lexer); break;
			case State.DOCTYPEPublicIdentifierSingleQuoted: DOCTYPEPublicIdentifierSingleQuoted(lexer); break;
			case State.AfterDOCTYPEPublicIdentifier: AfterDOCTYPEPublicIdentifier(lexer); break;
			case State.BetweenDOCTYPEPublicAndSystemIdentifiers: BetweenDOCTYPEPublicAndSystemIdentifiers(lexer); break;
			case State.AfterDOCTYPESystemKeyword: AfterDOCTYPESystemKeyword(lexer); break;
			case State.BeforeDOCTYPESystemIdentifier: BeforeDOCTYPESystemIdentifier(lexer); break;
			case State.DOCTYPESystemIdentifierDoubleQuoted: DOCTYPESystemIdentifierDoubleQuoted(lexer); break;
			case State.DOCTYPESystemIdentifierSingleQuoted: DOCTYPESystemIdentifierSingleQuoted(lexer); break;
			case State.AfterDOCTYPESystemIdentifier: AfterDOCTYPESystemIdentifier(lexer); break;
			case State.BogusDOCTYPE: BogusDOCTYPE(lexer); break;
			case State.CDATASection: CDATASection(lexer); break;
			case State.CDATASectionBracket: CDATASectionBracket(lexer); break;
			case State.CDATASectionEnd: CDATASectionEnd(lexer); break;
			case State.CharacterReference: CharacterReference(lexer); break;
			case State.NamedCharacterReference: NamedCharacterReference(lexer); break;
			case State.AmbiguousAmpersand: AmbiguousAmpersand(lexer); break;
			case State.NumericCharacterReference: NumericCharacterReference(lexer); break;
			case State.HexadecimalCharacterReferenceStart: HexadecimalCharacterReferenceStart(lexer); break;
			case State.DecimalCharacterReferenceStart: DecimalCharacterReferenceStart(lexer); break;
			case State.HexadecimalCharacterReference: HexadecimalCharacterReference(lexer); break;
			case State.DecimalCharacterReference: DecimalCharacterReference(lexer); break;
			case State.NumericCharacterReferenceEnd: NumericCharacterReferenceEnd(lexer); break;
		}
		console.log(lexer.i, lexer.cur_char);
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex|HTMLTagLex)[]} */
	let elements = [];
	for(let i = 0; i < lexer.lex_arr.length; i++) {
		let item = lexer.lex_arr[i];
		switch(item.type) {
			case 'data': elements.push(item); break;
			case 'special':
				lex_html_special_to_tag(elements, lexer.lex_arr, i);
				break;
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
