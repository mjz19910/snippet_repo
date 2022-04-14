import {lexerBeforeAttributeName} from "./lexerBeforeAttributeName";
import {BeforeAttributeValue} from "./lexerBeforeAttributeValue";
import {BeforeDOCTYPEName} from "./lexerBeforeDOCTYPEName";
import {BeforeDOCTYPEPublicIdentifier} from "./lexerBeforeDOCTYPEPublicIdentifier";
import {BeforeDOCTYPESystemIdentifier} from "./lexerBeforeDOCTYPESystemIdentifier";
import {BetweenDOCTYPEPublicAndSystemIdentifiers} from "./lexerBetweenDOCTYPEPublicAndSystemIdentifiers";
import {BogusComment} from "./lexerBogusComment";
import {BogusDOCTYPE} from "./lexerBogusDOCTYPE";
import {CDATASection} from "./lexerCDATASection";
import {CDATASectionBracket} from "./lexerCDATASectionBracket";
import {CDATASectionEnd} from "./lexerCDATASectionEnd";
import {CharacterReference} from "./lexerCharacterReference";
import {CommentEnd} from "./lexerCommentEnd";
import {CommentEndBang} from "./lexerCommentEndBang";
import {CommentEndDash} from "./lexerCommentEndDash";
import {CommentLessThanSign} from "./lexerCommentLessThanSign";
import {CommentLessThanSignBang} from "./lexerCommentLessThanSignBang";
import {CommentLessThanSignBangDashDash} from "./lexerCommentLessThanSignBangDashDash";
import {CommentStart} from "./lexerCommentStart";
import {CommentStartDash} from "./lexerCommentStartDash";
import {DecimalCharacterReference} from "./lexerDecimalCharacterReference";
import {DecimalCharacterReferenceStart} from "./lexerDecimalCharacterReferenceStart";
import {DOCTYPE} from "./lexerDOCTYPE";
import {DOCTYPEName} from "./lexerDOCTYPEName";
import {DOCTYPEPublicIdentifierDoubleQuoted} from "./lexerDOCTYPEPublicIdentifierDoubleQuoted";
import {DOCTYPEPublicIdentifierSingleQuoted} from "./lexerDOCTYPEPublicIdentifierSingleQuoted";
import {DOCTYPESystemIdentifierDoubleQuoted} from "./lexerDOCTYPESystemIdentifierDoubleQuoted";
import {DOCTYPESystemIdentifierSingleQuoted} from "./lexerDOCTYPESystemIdentifierSingleQuoted";
import {HexadecimalCharacterReference} from "./lexerHexadecimalCharacterReference";
import {HexadecimalCharacterReferenceStart} from "./lexerHexadecimalCharacterReferenceStart";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lexerAfterAttributeName} from "./lexerAfterAttributeName";
import {lexerAfterAttributeValueQuoted} from "./lexerAfterAttributeValueQuoted";
import {lexerAfterDOCTYPEName} from "./lexerAfterDOCTYPEName";
import {lexerAfterDOCTYPEPublicIdentifier} from "./lexerAfterDOCTYPEPublicIdentifier";
import {lexerAfterDOCTYPEPublicKeyword} from "./lexerAfterDOCTYPEPublicKeyword.js";
import {lexerAfterDOCTYPESystemIdentifier} from "./lexerAfterDOCTYPESystemIdentifier.js";
import {lexerAfterDOCTYPESystemKeyword} from "./lexerAfterDOCTYPESystemKeyword";
import {lexerAmbiguousAmpersand} from "./lexerAmbiguousAmpersand";
import {lexerAttributeName} from "./lexerAttributeName";
import {lexerAttributeValueDoubleQuoted} from "./lexerAttributeValueDoubleQuoted";
import {lexerAttributeValueSingleQuoted} from "./lexerAttributeValueSingleQuoted.js";
import {lexerAttributeValueUnquoted} from "./lexerAttributeValueUnquoted.js";
import {lexerComment} from "./lexerComment";
import {lexerCommentLessThanSignBangDash} from "./lexerCommentLessThanSignBangDash";
import {lexerData} from "./lexerData";
import {lexerEndTagOpen} from "./lexerEndTagOpen";
import {lexerPLAINTEXT} from "./lexerPLAINTEXT";
import {lexerRAWTEXT} from "./lexerRAWTEXT";
import {lexerRCDATA} from "./lexerRCDATA";
import {lexerScriptData} from "./lexerScriptData";
import {lexerTagName} from "./lexerTagName";
import {lexerTagOpen} from "./lexerTagOpen";
import {lexerMarkupDeclarationOpen} from "./lexerMarkupDeclarationOpen";
import {lexerNamedCharacterReference} from "./lexerNamedCharacterReference";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {NumericCharacterReference} from "./lexerNumericCharacterReference";
import {NumericCharacterReferenceEnd} from "./lexerNumericCharacterReferenceEnd";
import {RAWTEXTEndTagName} from "./lexerRAWTEXTEndTagName";
import {RAWTEXTEndTagOpen} from "./lexerRAWTEXTEndTagOpen";
import {RAWTEXTLessThanSign} from "./lexerRAWTEXTLessThanSign";
import {RCDATAEndTagName} from "./lexerRCDATAEndTagName";
import {RCDATAEndTagOpen} from "./lexerRCDATAEndTagOpen";
import {lexerRCDATALessThanSign} from "./lexerRCDATALessThanSign";
import {lexerScriptDataDoubleEscaped} from "./lexerScriptDataDoubleEscaped";
import {lexerScriptDataDoubleEscapedDash} from "./lexerScriptDataDoubleEscapedDash";
import {lexerScriptDataDoubleEscapedDashDash} from "./lexerScriptDataDoubleEscapedDashDash";
import {lexerScriptDataDoubleEscapedLessThanSign} from "./lexerScriptDataDoubleEscapedLessThanSign";
import {lexerScriptDataDoubleEscapeEnd} from "./lexerScriptDataDoubleEscapeEnd";
import {lexerScriptDataDoubleEscapeStart} from "./lexerScriptDataDoubleEscapeStart";
import {lexerScriptDataEndTagName} from "./lexerScriptDataEndTagName";
import {lexerScriptDataEndTagOpen} from "./lexerScriptDataEndTagOpen";
import {lexerScriptDataEscaped} from "./lexerScriptDataEscaped";
import {lexerScriptDataEscapedDash} from "./lexerScriptDataEscapedDash";
import {lexerScriptDataEscapedDashDash} from "./lexerScriptDataEscapedDashDash";
import {lexerScriptDataEscapedEndTagName} from "./lexerScriptDataEscapedEndTagName";
import {lexerScriptDataEscapedEndTagOpen} from "./lexerScriptDataEscapedEndTagOpen";
import {lexerScriptDataEscapedLessThanSign} from "./lexerScriptDataEscapedLessThanSign";
import {lexerScriptDataEscapeStart} from "./lexerScriptDataEscapeStart";
import {lexerScriptDataEscapeStartDash} from "./lexerScriptDataEscapeStartDash";
import {lexerScriptDataLessThanSign} from "./lexerScriptDataLessThanSign";
import {lexerSelfClosingStartTag} from "./lexerSelfClosingStartTag";
import {State} from "./State.js";
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
			case State.Data: lexerData(lexer); break;
			case State.RCDATA: lexerRCDATA(lexer); break;
			case State.RAWTEXT: lexerRAWTEXT(lexer); break;
			case State.ScriptData: lexerScriptData(lexer); break;
			case State.PLAINTEXT: lexerPLAINTEXT(lexer); break;
			case State.TagOpen: lexerTagOpen(lexer); break;
			case State.EndTagOpen: lexerEndTagOpen(lexer); break;
			case State.TagName: lexerTagName(lexer); break;
			case State.RCDATALessThanSign: lexerRCDATALessThanSign(lexer); break;
			case State.RCDATAEndTagOpen: RCDATAEndTagOpen(lexer); break;
			case State.RCDATAEndTagName: RCDATAEndTagName(lexer); break;
			case State.RAWTEXTLessThanSign: RAWTEXTLessThanSign(lexer); break;
			case State.RAWTEXTEndTagOpen: RAWTEXTEndTagOpen(lexer); break;
			case State.RAWTEXTEndTagName: RAWTEXTEndTagName(lexer); break;
			case State.ScriptDataLessThanSign: lexerScriptDataLessThanSign(lexer); break;
			case State.ScriptDataEndTagOpen: lexerScriptDataEndTagOpen(lexer); break;
			case State.ScriptDataEndTagName: lexerScriptDataEndTagName(lexer); break;
			case State.ScriptDataEscapeStart: lexerScriptDataEscapeStart(lexer); break;
			case State.ScriptDataEscapeStartDash: lexerScriptDataEscapeStartDash(lexer); break;
			case State.ScriptDataEscaped: lexerScriptDataEscaped(lexer); break;
			case State.ScriptDataEscapedDash: lexerScriptDataEscapedDash(lexer); break;
			case State.ScriptDataEscapedDashDash: lexerScriptDataEscapedDashDash(lexer); break;
			case State.ScriptDataEscapedLessThanSign: lexerScriptDataEscapedLessThanSign(lexer); break;
			case State.ScriptDataEscapedEndTagOpen: lexerScriptDataEscapedEndTagOpen(lexer); break;
			case State.ScriptDataEscapedEndTagName: lexerScriptDataEscapedEndTagName(lexer); break;
			case State.ScriptDataDoubleEscapeStart: lexerScriptDataDoubleEscapeStart(lexer); break;
			case State.ScriptDataDoubleEscaped: lexerScriptDataDoubleEscaped(lexer); break;
			case State.ScriptDataDoubleEscapedDash: lexerScriptDataDoubleEscapedDash(lexer); break;
			case State.ScriptDataDoubleEscapedDashDash: lexerScriptDataDoubleEscapedDashDash(lexer); break;
			case State.ScriptDataDoubleEscapedLessThanSign: lexerScriptDataDoubleEscapedLessThanSign(lexer); break;
			case State.ScriptDataDoubleEscapeEnd: lexerScriptDataDoubleEscapeEnd(lexer); break;
			case State.BeforeAttributeName: lexerBeforeAttributeName(lexer); break;
			case State.AttributeName: lexerAttributeName(lexer); break;
			case State.AfterAttributeName: lexerAfterAttributeName(lexer); break;
			case State.BeforeAttributeValue: BeforeAttributeValue(lexer); break;
			case State.AttributeValueDoubleQuoted: lexerAttributeValueDoubleQuoted(lexer); break;
			case State.AttributeValueSingleQuoted: lexerAttributeValueSingleQuoted(lexer); break;
			case State.AttributeValueUnquoted: lexerAttributeValueUnquoted(lexer); break;
			case State.AfterAttributeValueQuoted: lexerAfterAttributeValueQuoted(lexer); break;
			case State.SelfClosingStartTag: lexerSelfClosingStartTag(lexer); break;
			case State.BogusComment: BogusComment(lexer); break;
			case State.MarkupDeclarationOpen: lexerMarkupDeclarationOpen(lexer); break;
			case State.CommentStart: CommentStart(lexer); break;
			case State.CommentStartDash: CommentStartDash(lexer); break;
			case State.Comment: lexerComment(lexer); break;
			case State.CommentLessThanSign: CommentLessThanSign(lexer); break;
			case State.CommentLessThanSignBang: CommentLessThanSignBang(lexer); break;
			case State.CommentLessThanSignBangDash: lexerCommentLessThanSignBangDash(lexer); break;
			case State.CommentLessThanSignBangDashDash: CommentLessThanSignBangDashDash(lexer); break;
			case State.CommentEndDash: CommentEndDash(lexer); break;
			case State.CommentEnd: CommentEnd(lexer); break;
			case State.CommentEndBang: CommentEndBang(lexer); break;
			case State.DOCTYPE: DOCTYPE(lexer); break;
			case State.BeforeDOCTYPEName: BeforeDOCTYPEName(lexer); break;
			case State.DOCTYPEName: DOCTYPEName(lexer); break;
			case State.AfterDOCTYPEName: lexerAfterDOCTYPEName(lexer); break;
			case State.AfterDOCTYPEPublicKeyword: lexerAfterDOCTYPEPublicKeyword(lexer); break;
			case State.BeforeDOCTYPEPublicIdentifier: BeforeDOCTYPEPublicIdentifier(lexer); break;
			case State.DOCTYPEPublicIdentifierDoubleQuoted: DOCTYPEPublicIdentifierDoubleQuoted(lexer); break;
			case State.DOCTYPEPublicIdentifierSingleQuoted: DOCTYPEPublicIdentifierSingleQuoted(lexer); break;
			case State.AfterDOCTYPEPublicIdentifier: lexerAfterDOCTYPEPublicIdentifier(lexer); break;
			case State.BetweenDOCTYPEPublicAndSystemIdentifiers: BetweenDOCTYPEPublicAndSystemIdentifiers(lexer); break;
			case State.AfterDOCTYPESystemKeyword: lexerAfterDOCTYPESystemKeyword(lexer); break;
			case State.BeforeDOCTYPESystemIdentifier: BeforeDOCTYPESystemIdentifier(lexer); break;
			case State.DOCTYPESystemIdentifierDoubleQuoted: DOCTYPESystemIdentifierDoubleQuoted(lexer); break;
			case State.DOCTYPESystemIdentifierSingleQuoted: DOCTYPESystemIdentifierSingleQuoted(lexer); break;
			case State.AfterDOCTYPESystemIdentifier: lexerAfterDOCTYPESystemIdentifier(lexer); break;
			case State.BogusDOCTYPE: BogusDOCTYPE(lexer); break;
			case State.CDATASection: CDATASection(lexer); break;
			case State.CDATASectionBracket: CDATASectionBracket(lexer); break;
			case State.CDATASectionEnd: CDATASectionEnd(lexer); break;
			case State.CharacterReference: CharacterReference(lexer); break;
			case State.NamedCharacterReference: lexerNamedCharacterReference(lexer); break;
			case State.AmbiguousAmpersand: lexerAmbiguousAmpersand(lexer); break;
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
