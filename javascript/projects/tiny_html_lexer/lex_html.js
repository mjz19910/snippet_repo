import {lexerBeforeAttributeName} from "./lexerBeforeAttributeName"
import {lexerBeforeAttributeValue} from "./lexerBeforeAttributeValue"
import {lexerBeforeDOCTYPEName} from "./lexerBeforeDOCTYPEName"
import {lexerBeforeDOCTYPEPublicIdentifier} from "./lexerBeforeDOCTYPEPublicIdentifier"
import {lexerBeforeDOCTYPESystemIdentifier} from "./lexerBeforeDOCTYPESystemIdentifier"
import {lexerBetweenDOCTYPEPublicAndSystemIdentifiers} from "./lexerBetweenDOCTYPEPublicAndSystemIdentifiers"
import {lexerBogusComment} from "./lexerBogusComment"
import {lexerBogusDOCTYPE} from "./lexerBogusDOCTYPE"
import {lexerCDATASection} from "./lexerCDATASection"
import {lexerCDATASectionBracket} from "./lexerCDATASectionBracket"
import {lexerCDATASectionEnd} from "./lexerCDATASectionEnd"
import {lexerCharacterReference} from "./lexerCharacterReference"
import {lexerCommentEnd} from "./lexerCommentEnd"
import {lexerCommentEndBang} from "./lexerCommentEndBang"
import {lexerCommentEndDash} from "./lexerCommentEndDash"
import {lexerCommentLessThanSign} from "./lexerCommentLessThanSign"
import {lexerCommentLessThanSignBang} from "./lexerCommentLessThanSignBang"
import {lexerCommentLessThanSignBangDashDash} from "./lexerCommentLessThanSignBangDashDash"
import {lexerCommentStart} from "./lexerCommentStart"
import {lexerCommentStartDash} from "./lexerCommentStartDash"
import {lexerDecimalCharacterReference} from "./lexerDecimalCharacterReference"
import {lexerDecimalCharacterReferenceStart} from "./lexerDecimalCharacterReferenceStart"
import {lexerDOCTYPE} from "./lexerDOCTYPE"
import {lexerDOCTYPEName} from "./lexerDOCTYPEName"
import {lexerDOCTYPEPublicIdentifierDoubleQuoted} from "./lexerDOCTYPEPublicIdentifierDoubleQuoted"
import {lexerDOCTYPEPublicIdentifierSingleQuoted} from "./lexerDOCTYPEPublicIdentifierSingleQuoted"
import {lexerDOCTYPESystemIdentifierDoubleQuoted} from "./lexerDOCTYPESystemIdentifierDoubleQuoted"
import {lexerDOCTYPESystemIdentifierSingleQuoted} from "./lexerDOCTYPESystemIdentifierSingleQuoted"
import {lexerHexadecimalCharacterReference} from "./lexerHexadecimalCharacterReference"
import {HexadecimalCharacterReferenceStart} from "./lexerHexadecimalCharacterReferenceStart"
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js"
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js"
import {HTMLLexerState} from "./HTMLLexerState.js"
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js"
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js"
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js"
import {lexerAfterAttributeName} from "./lexerAfterAttributeName"
import {lexerAfterAttributeValueQuoted} from "./lexerAfterAttributeValueQuoted"
import {lexerAfterDOCTYPEName} from "./lexerAfterDOCTYPEName"
import {lexerAfterDOCTYPEPublicIdentifier} from "./lexerAfterDOCTYPEPublicIdentifier"
import {lexerAfterDOCTYPEPublicKeyword} from "./lexerAfterDOCTYPEPublicKeyword.js"
import {lexerAfterDOCTYPESystemIdentifier} from "./lexerAfterDOCTYPESystemIdentifier.js"
import {lexerAfterDOCTYPESystemKeyword} from "./lexerAfterDOCTYPESystemKeyword"
import {lexerAmbiguousAmpersand} from "./lexerAmbiguousAmpersand"
import {lexerAttributeName} from "./lexerAttributeName"
import {lexerAttributeValueDoubleQuoted} from "./lexerAttributeValueDoubleQuoted"
import {lexerAttributeValueSingleQuoted} from "./lexerAttributeValueSingleQuoted.js"
import {lexerAttributeValueUnquoted} from "./lexerAttributeValueUnquoted.js"
import {lexerComment} from "./lexerComment"
import {lexerCommentLessThanSignBangDash} from "./lexerCommentLessThanSignBangDash"
import {lexerData} from "./lexerData"
import {lexerEndTagOpen} from "./lexerEndTagOpen"
import {lexerPLAINTEXT} from "./lexerPLAINTEXT"
import {lexerRAWTEXT} from "./lexerRAWTEXT"
import {lexerRCDATA} from "./lexerRCDATA"
import {lexerScriptData} from "./lexerScriptData"
import {lexerTagName} from "./lexerTagName"
import {lexerTagOpen} from "./lexerTagOpen"
import {lexerMarkupDeclarationOpen} from "./lexerMarkupDeclarationOpen"
import {lexerNamedCharacterReference} from "./lexerNamedCharacterReference"
import {NodeInternalData} from "../page_loader/NodeInternalData.js"
import {lexerNumericCharacterReference} from "./lexerNumericCharacterReference"
import {lexerNumericCharacterReferenceEnd} from "./lexerNumericCharacterReferenceEnd"
import {lexerRAWTEXTEndTagName} from "./lexerRAWTEXTEndTagName"
import {lexerRAWTEXTEndTagOpen} from "./lexerRAWTEXTEndTagOpen"
import {lexerRAWTEXTLessThanSign} from "./lexerRAWTEXTLessThanSign"
import {lexerRCDATAEndTagName} from "./lexerRCDATAEndTagName"
import {lexerRCDATAEndTagOpen} from "./lexerRCDATAEndTagOpen"
import {lexerRCDATALessThanSign} from "./lexerRCDATALessThanSign"
import {lexerScriptDataDoubleEscaped} from "./lexerScriptDataDoubleEscaped"
import {lexerScriptDataDoubleEscapedDash} from "./lexerScriptDataDoubleEscapedDash"
import {lexerScriptDataDoubleEscapedDashDash} from "./lexerScriptDataDoubleEscapedDashDash"
import {lexerScriptDataDoubleEscapedLessThanSign} from "./lexerScriptDataDoubleEscapedLessThanSign"
import {lexerScriptDataDoubleEscapeEnd} from "./lexerScriptDataDoubleEscapeEnd"
import {lexerScriptDataDoubleEscapeStart} from "./lexerScriptDataDoubleEscapeStart"
import {lexerScriptDataEndTagName} from "./lexerScriptDataEndTagName"
import {lexerScriptDataEndTagOpen} from "./lexerScriptDataEndTagOpen"
import {lexerScriptDataEscaped} from "./lexerScriptDataEscaped"
import {lexerScriptDataEscapedDash} from "./lexerScriptDataEscapedDash"
import {lexerScriptDataEscapedDashDash} from "./lexerScriptDataEscapedDashDash"
import {lexerScriptDataEscapedEndTagName} from "./lexerScriptDataEscapedEndTagName"
import {lexerScriptDataEscapedEndTagOpen} from "./lexerScriptDataEscapedEndTagOpen"
import {lexerScriptDataEscapedLessThanSign} from "./lexerScriptDataEscapedLessThanSign"
import {lexerScriptDataEscapeStart} from "./lexerScriptDataEscapeStart"
import {lexerScriptDataEscapeStartDash} from "./lexerScriptDataEscapeStartDash"
import {lexerScriptDataLessThanSign} from "./lexerScriptDataLessThanSign"
import {lexerSelfClosingStartTag} from "./lexerSelfClosingStartTag"
import {State} from "./State.js"
export const abc_chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const num_chars="0123456789"
/**@type {number[]}*/
export const ok_char_int8s=[]
export const h_enc={
	raquo: [187],
	nbsp: [160],
	copy: [169],
	amp: [38],
}
/**@arg {any} v @returns {any}*/
export function any(v) {
	return v
}
/**
 * @param {Uint8Array} html
 */
export function lex_html(html) {
	const todo_err=new Error("TODO")
	let lexer=new HTMLLexerState(html)
	var document_root=new NodeInternalData('root',0,[],null)
	/**@type {0|1|2}*/
	lexer.lex_mode=0
	lexer.is_in_tag_attrs=false
	lexer.is_in_tag_content=true
	lexer.is_in_script_tag=false
	/**@type {(ReturnType<typeof js_type_html_lex_arr>)[]} */
	lexer.lex_arr=[]
	// stage 1, handle script and style tags and ending and opening of html
	// tags (also newline and crlf)
	for(lexer.i=0;lexer.i<lexer.html.length;lexer.i++) {
		lexer.cur_lex=lexer.html[lexer.i]
		lexer.cur_char=lexer.dec(lexer.i,1)
		switch(lexer.m_current_state) {
			case State.Data: lexerData(lexer); break
			case State.RCDATA: lexerRCDATA(lexer); break
			case State.RAWTEXT: lexerRAWTEXT(lexer); break
			case State.ScriptData: lexerScriptData(lexer); break
			case State.PLAINTEXT: lexerPLAINTEXT(lexer); break
			case State.TagOpen: lexerTagOpen(lexer); break
			case State.EndTagOpen: lexerEndTagOpen(lexer); break
			case State.TagName: lexerTagName(lexer); break
			case State.RCDATALessThanSign: lexerRCDATALessThanSign(lexer); break
			case State.RCDATAEndTagOpen: lexerRCDATAEndTagOpen(lexer); break
			case State.RCDATAEndTagName: lexerRCDATAEndTagName(lexer); break
			case State.RAWTEXTLessThanSign: lexerRAWTEXTLessThanSign(lexer); break
			case State.RAWTEXTEndTagOpen: lexerRAWTEXTEndTagOpen(lexer); break
			case State.RAWTEXTEndTagName: lexerRAWTEXTEndTagName(lexer); break
			case State.ScriptDataLessThanSign: lexerScriptDataLessThanSign(lexer); break
			case State.ScriptDataEndTagOpen: lexerScriptDataEndTagOpen(lexer); break
			case State.ScriptDataEndTagName: lexerScriptDataEndTagName(lexer); break
			case State.ScriptDataEscapeStart: lexerScriptDataEscapeStart(lexer); break
			case State.ScriptDataEscapeStartDash: lexerScriptDataEscapeStartDash(lexer); break
			case State.ScriptDataEscaped: lexerScriptDataEscaped(lexer); break
			case State.ScriptDataEscapedDash: lexerScriptDataEscapedDash(lexer); break
			case State.ScriptDataEscapedDashDash: lexerScriptDataEscapedDashDash(lexer); break
			case State.ScriptDataEscapedLessThanSign: lexerScriptDataEscapedLessThanSign(lexer); break
			case State.ScriptDataEscapedEndTagOpen: lexerScriptDataEscapedEndTagOpen(lexer); break
			case State.ScriptDataEscapedEndTagName: lexerScriptDataEscapedEndTagName(lexer); break
			case State.ScriptDataDoubleEscapeStart: lexerScriptDataDoubleEscapeStart(lexer); break
			case State.ScriptDataDoubleEscaped: lexerScriptDataDoubleEscaped(lexer); break
			case State.ScriptDataDoubleEscapedDash: lexerScriptDataDoubleEscapedDash(lexer); break
			case State.ScriptDataDoubleEscapedDashDash: lexerScriptDataDoubleEscapedDashDash(lexer); break
			case State.ScriptDataDoubleEscapedLessThanSign: lexerScriptDataDoubleEscapedLessThanSign(lexer); break
			case State.ScriptDataDoubleEscapeEnd: lexerScriptDataDoubleEscapeEnd(lexer); break
			case State.BeforeAttributeName: lexerBeforeAttributeName(lexer); break
			case State.AttributeName: lexerAttributeName(lexer); break
			case State.AfterAttributeName: lexerAfterAttributeName(lexer); break
			case State.BeforeAttributeValue: lexerBeforeAttributeValue(lexer); break
			case State.AttributeValueDoubleQuoted: lexerAttributeValueDoubleQuoted(lexer); break
			case State.AttributeValueSingleQuoted: lexerAttributeValueSingleQuoted(lexer); break
			case State.AttributeValueUnquoted: lexerAttributeValueUnquoted(lexer); break
			case State.AfterAttributeValueQuoted: lexerAfterAttributeValueQuoted(lexer); break
			case State.SelfClosingStartTag: lexerSelfClosingStartTag(lexer); break
			case State.BogusComment: lexerBogusComment(lexer); break
			case State.MarkupDeclarationOpen: lexerMarkupDeclarationOpen(lexer); break
			case State.CommentStart: lexerCommentStart(lexer); break
			case State.CommentStartDash: lexerCommentStartDash(lexer); break
			case State.Comment: lexerComment(lexer); break
			case State.CommentLessThanSign: lexerCommentLessThanSign(lexer); break
			case State.CommentLessThanSignBang: lexerCommentLessThanSignBang(lexer); break
			case State.CommentLessThanSignBangDash: lexerCommentLessThanSignBangDash(lexer); break
			case State.CommentLessThanSignBangDashDash: lexerCommentLessThanSignBangDashDash(lexer); break
			case State.CommentEndDash: lexerCommentEndDash(lexer); break
			case State.CommentEnd: lexerCommentEnd(lexer); break
			case State.CommentEndBang: lexerCommentEndBang(lexer); break
			case State.DOCTYPE: lexerDOCTYPE(lexer); break
			case State.BeforeDOCTYPEName: lexerBeforeDOCTYPEName(lexer); break
			case State.DOCTYPEName: lexerDOCTYPEName(lexer); break
			case State.AfterDOCTYPEName: lexerAfterDOCTYPEName(lexer); break
			case State.AfterDOCTYPEPublicKeyword: lexerAfterDOCTYPEPublicKeyword(lexer); break
			case State.BeforeDOCTYPEPublicIdentifier: lexerBeforeDOCTYPEPublicIdentifier(lexer); break
			case State.DOCTYPEPublicIdentifierDoubleQuoted: lexerDOCTYPEPublicIdentifierDoubleQuoted(lexer); break
			case State.DOCTYPEPublicIdentifierSingleQuoted: lexerDOCTYPEPublicIdentifierSingleQuoted(lexer); break
			case State.AfterDOCTYPEPublicIdentifier: lexerAfterDOCTYPEPublicIdentifier(lexer); break
			case State.BetweenDOCTYPEPublicAndSystemIdentifiers: lexerBetweenDOCTYPEPublicAndSystemIdentifiers(lexer); break
			case State.AfterDOCTYPESystemKeyword: lexerAfterDOCTYPESystemKeyword(lexer); break
			case State.BeforeDOCTYPESystemIdentifier: lexerBeforeDOCTYPESystemIdentifier(lexer); break
			case State.DOCTYPESystemIdentifierDoubleQuoted: lexerDOCTYPESystemIdentifierDoubleQuoted(lexer); break
			case State.DOCTYPESystemIdentifierSingleQuoted: lexerDOCTYPESystemIdentifierSingleQuoted(lexer); break
			case State.AfterDOCTYPESystemIdentifier: lexerAfterDOCTYPESystemIdentifier(lexer); break
			case State.BogusDOCTYPE: lexerBogusDOCTYPE(lexer); break
			case State.CDATASection: lexerCDATASection(lexer); break
			case State.CDATASectionBracket: lexerCDATASectionBracket(lexer); break
			case State.CDATASectionEnd: lexerCDATASectionEnd(lexer); break
			case State.CharacterReference: lexerCharacterReference(lexer); break
			case State.NamedCharacterReference: lexerNamedCharacterReference(lexer); break
			case State.AmbiguousAmpersand: lexerAmbiguousAmpersand(lexer); break
			case State.NumericCharacterReference: lexerNumericCharacterReference(lexer); break
			case State.HexadecimalCharacterReferenceStart: HexadecimalCharacterReferenceStart(lexer); break
			case State.DecimalCharacterReferenceStart: lexerDecimalCharacterReferenceStart(lexer); break
			case State.HexadecimalCharacterReference: lexerHexadecimalCharacterReference(lexer); break
			case State.DecimalCharacterReference: lexerDecimalCharacterReference(lexer); break
			case State.NumericCharacterReferenceEnd: lexerNumericCharacterReferenceEnd(lexer); break
		}
		console.log(lexer.i,lexer.cur_char)
	}
	// stage 2, collect into tags marked if they open or close
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex|HTMLTagLex)[]} */
	let elements=[]
	for(let i=0;i<lexer.lex_arr.length;i++) {
		let item=lexer.lex_arr[i]
		switch(item.type) {
			case 'data': elements.push(item); break
			case 'special':
				throw new Error("Not implemented yet")
		}
	}
	return {
		lex_arr: lexer.lex_arr,
		elements,
		document_root
	}
}

export function use_types() {
	return [
		js_type_html_lex_arr,
	]
}
