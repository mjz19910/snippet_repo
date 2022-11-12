import {EnvSettingsType} from "../EnvSettingsType.js";
import {DispatcherIndexType} from "./DispatcherIndexType.js";
import {Lexer,section_12} from "./section_12.js";
import {section_12_2} from "./section_12_2.js";
import {section_12_3} from "./section_12_3.js";
import {section_12_4} from "./section_12_4.js";
import {section_12_5} from "./section_12_5.js";
import {section_12_6} from "./section_12_6.js";
import {section_12_7} from "./section_12_7.js";
import {section_12_8} from "./section_12_8.js";
import {section_12_8_3} from "./section_12_8_3.js";
import {section_12_8_4} from "./section_12_8_4.js";
import {section_12_8_5} from "./section_12_8_5.js";
import {section_12_8_6} from "./section_12_8_6.js";

export class Dispatcher {
	[x: string]: DispatcherIndexType
	lexer: Lexer=new Lexer(this)
	ecma_12_2: section_12_2=new section_12_2(this)
	ecma_12_3: section_12_3=new section_12_3(this)
	ecma_12_4: section_12_4=new section_12_4(this)
	ecma_12_5: section_12_5=new section_12_5(this)
	ecma_12_6: section_12_6=new section_12_6(this)
	ecma_12_7: section_12_7=new section_12_7(this)
	ecma_12_8_3: section_12_8_3=new section_12_8_3(this)
	ecma_12_8_4: section_12_8_4=new section_12_8_4(this)
	ecma_12_8_5: section_12_8_5=new section_12_8_5(this)
	ecma_12_8_6: section_12_8_6=new section_12_8_6(this)
	ecma_12: section_12=new section_12(this)
	ecma_12_8: section_12_8=new section_12_8(this)
	environment_settings: EnvSettingsType={
		type: 'environment_settings',
		is_strict: false,
	}
	DivPunctuator(str: string,index: number) {
		return this.ecma_12_7.DivPunctuator(str,index)
	}
	CommonToken(str: string,index: number) {
		return this.ecma_12_5.CommonToken(str,index)
	}
	RightBracePunctuator(str: string,index: number) {
		return this.ecma_12_7.RightBracePunctuator(str,index)
	}
	Comment(str: string,index: number) {
		return this.ecma_12_4.Comment(str,index)
	}
	HexDigits(str: string,index: number) {
		return this.ecma_12_8_3.HexDigits(str,index)
	}
	IdentifierName(str: string,index: number) {
		return this.ecma_12_6.IdentifierName(str,index)
	}
	PrivateIdentifier(str: string,index: number) {
		return this.ecma_12_6.PrivateIdentifier(str,index)
	}
	Punctuator(str: string,index: number) {
		return this.ecma_12_7.Punctuator(str,index)
	}
	DecimalDigit(str: string,index: number) {
		return this.ecma_12_8_3.DecimalDigit(str,index)
	}
	NumericLiteral(str: string,index: number) {
		return this.ecma_12_8_3.NumericLiteral(str,index)
	}
	StringLiteral(str: string,index: number) {
		return this.ecma_12_8_4.StringLiteral(str,index)
	}
	Template(str: string,index: number) {
		return this.ecma_12_8_6.Template(str,index)
	}
	LineTerminator(str: string,index: number) {
		return this.ecma_12_3.LineTerminator(str,index)
	}
	CharacterEscapeSequence(str: string,index: number) {
		return this.ecma_12_8_4.CharacterEscapeSequence(str,index)
	}
	LineTerminatorSequence(str: string,index: number) {
		return this.ecma_12_3.LineTerminatorSequence(str,index)
	}
	HexDigit(str: string,index: number) {
		return this.ecma_12_8_3.HexDigit(str,index)
	}
	CodePoint(str: string,index: number) {
		return this.ecma_12_8_6.CodePoint(str,index)
	}
	LineContinuation(str: string,index: number) {
		return this.ecma_12_8_4.LineContinuation(str,index)
	}
	OctalDigit(str: string,index: number) {
		return this.ecma_12_8_3.OctalDigit(str,index)
	}
	HexEscapeSequence(str: string,index: number) {
		return this.ecma_12_8_4.HexEscapeSequence(str,index)
	}
	UnicodeEscapeSequence(str: string,index: number) {
		return this.ecma_12_8_4.HexEscapeSequence(str,index)
	}
	RegularExpressionLiteral(str: string,index: number) {
		return this.ecma_12_8_5.RegularExpressionLiteral(str,index)
	}
	TemplateSubstitutionTail(str: string,index: number) {
		return this.ecma_12_8_6.TemplateSubstitutionTail(str,index)
	}
	WhiteSpace(str: string,index: number) {
		return this.ecma_12_2.WhiteSpace(str,index)
	}
	IdentifierPartChar(str: string,index: number) {
		return this.ecma_12_6.IdentifierPartChar(str,index)
	}
	InputElementDiv(str: string,index: number) {
		return this.ecma_12.InputElementDiv(str,index)
	}
	InputElementRegExpOrTemplateTail(str: string,index: number) {
		return this.ecma_12.InputElementRegExpOrTemplateTail(str,index)
	}
}
