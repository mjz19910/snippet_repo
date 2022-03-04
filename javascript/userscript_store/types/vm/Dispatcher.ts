import {DispatcherType} from "./DispatcherType";
import {ecma_12_2} from "./ecma_12_2";
import {ecma_12_3} from "./ecma_12_3";
import {ecma_12_4} from "./ecma_12_4";
import {ecma_12_5} from "./ecma_12_5";
import {ecma_12_6} from "./ecma_12_6";
import {ecma_12_7} from "./ecma_12_7";
import {ecma_12_8_3} from "./ecma_12_8_3";
import {ecma_12_8_4} from "./ecma_12_8_4";
import {ecma_12_8_6} from "./ecma_12_8_6";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";
import {ecma_12 as ecma_12} from "./ecma_12";
class ecma_12_8_5 extends ecma_base {
	RegularExpressionLiteral(str: string, index: number): ecma_return_type {
		let len = 0;
		// / RegularExpressionBody / RegularExpressionFlags
		if(str[index] === '/') {
			len++;
		} else {
			return [null, 0];
		}
		let res = this.RegularExpressionBody(str, index);
		if(str[index + len] === '/') {
			len++;
		} else {
			return [null, 0];
		}
		res = this.RegularExpressionFlags(str, index);
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionBody
	RegularExpressionBody(str: string, index: number): ecma_return_type {
		// RegularExpressionFirstChar RegularExpressionChars
		let res = this.RegularExpressionFirstChar(str, index);
		throw new Error("TODO");
	};
	// https://tc39.es/ecma262/#prod-RegularExpressionFirstChar
	RegularExpressionFirstChar(str: string, index: number): ecma_return_type {
		// RegularExpressionNonTerminator but not one of * or \ or / or [
		x: {
			if(str[index] === '*' || str[index] === '\\' && str[index] === '/' || str[index] === '[]'[0]) {
				break x;
			}
			let res = this.RegularExpressionNonTerminator(str, index);
			if(res[0]) return [true, res[1]];
		}
		// RegularExpressionBackslashSequence
		let res = this.RegularExpressionBackslashSequence(str, index);
		if(res[0]) return [true, res[1]]
		// RegularExpressionClass
		res = this.RegularExpressionClass(str, index);
		if(res[0]) return [true, res[1]];
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator
	RegularExpressionNonTerminator(str: string, index: number): ecma_return_type {
		// SourceCharacter but not LineTerminator
		let vv = this.m_dispatcher.LineTerminator(str, index);
		if(vv[0]) return [null, 0];
		return [true, 1];
	};
	// https://tc39.es/ecma262/#prod-RegularExpressionBackslashSequence
	RegularExpressionBackslashSequence(str: string, index: number): ecma_return_type {
		// \ RegularExpressionNonTerminator
		if(str[index] === '\\') {
			let res = this.RegularExpressionNonTerminator(str, index + 1);
			if(res[0]) return [true, 1 + res[1]];
		}
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClass
	RegularExpressionClass(str: string, index: number): ecma_return_type {
		let len = 0;
		// [ RegularExpressionClassChars ]
		if(str[index] === '[]'[0]) {
			len++;
			let res = this.RegularExpressionClassChars(str, index + len);
			if(res[0]) {
				if(str[index + res[1]] === '[]'[1]) {
					len++;
					return [true, len + res[1]]
				}
			}
		}
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChars
	RegularExpressionClassChars(str: string, index: number): ecma_return_type {
		let len = 0;
		let is_class_chars = this.RegularExpressionClassChar(str, index + len);
		// [empty]
		if(!is_class_chars[0]) return [true, 0];
		while(is_class_chars[0]) {
			len++;
			is_class_chars = this.RegularExpressionClassChar(str, index + len);
			if(!is_class_chars[0]) {
				break;
			}
		}
		return [true, len];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionClassChar
	RegularExpressionClassChar(str: string, index: number): ecma_return_type {
		// RegularExpressionNonTerminator but not one of ] or \
		if(str[index] === '[]'[1] || str[index] === '\\') {
			return [null, 0];
		}
		let res = this.RegularExpressionNonTerminator(str, index);
		if(res[0]) return [true, res[1]];
		res = this.RegularExpressionBackslashSequence(str, index);
		if(res[0]) return [true, res[1]];
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-RegularExpressionFlags
	RegularExpressionFlags(str: string, index: number): ecma_return_type {
		// [empty]
		let len = 0;
		let is_class_chars = this.m_dispatcher.IdentifierPartChar(str, index + len);
		if(!is_class_chars[0]) return [true, 0];
		throw new Error("TODO");
	};
}

export type EnvSettingsType = {
	type: 'environment_settings';
	is_strict: boolean;
};

export type DispatcherIndexType = ((str: string, index: number) => ecma_return_type) | ecma_base | EnvSettingsType;

export class Dispatcher implements DispatcherType {
	ecma_12_2: ecma_12_2=new ecma_12_2(this);
	ecma_12_3: ecma_12_3=new ecma_12_3(this);
	ecma_12_4: ecma_12_4=new ecma_12_4(this);
	ecma_12_5: ecma_12_5=new ecma_12_5(this);
	ecma_12_6: ecma_12_6=new ecma_12_6(this);
	ecma_12_7: ecma_12_7=new ecma_12_7(this);
	ecma_12_8_3: ecma_12_8_3=new ecma_12_8_3(this);
	ecma_12_8_4: ecma_12_8_4=new ecma_12_8_4(this);
	ecma_12_8_5: ecma_12_8_5=new ecma_12_8_5(this);
	ecma_12_8_6: ecma_12_8_6=new ecma_12_8_6(this);
	ecma_12:ecma_12=new ecma_12(this);
	[x: string]: DispatcherIndexType;
	environment_settings: EnvSettingsType = {
		type: 'environment_settings',
		is_strict: false,
	};
	DivPunctuator(str: string, index: number) {
		return this.ecma_12_7.DivPunctuator(str, index);
	}
	CommonToken(str: string, index: number) {
		return this.ecma_12_5.CommonToken(str, index);
	}
	RightBracePunctuator(str: string, index: number) {
		return this.ecma_12_7.RightBracePunctuator(str, index);
	}
	Comment(str: string, index: number) {
		return this.ecma_12_4.Comment(str, index);
	}
	HexDigits(str: string, index: number) {
		return this.ecma_12_8_3.HexDigits(str, index);
	}
	IdentifierName(str: string, index: number) {
		return this.ecma_12_6.IdentifierName(str, index);
	}
	PrivateIdentifier(str: string, index: number) {
		return this.ecma_12_6.PrivateIdentifier(str, index);
	}
	Punctuator(str: string, index: number) {
		return this.ecma_12_7.Punctuator(str, index);
	}
	DecimalDigit(str: string, index: number) {
		return this.ecma_12_8_3.DecimalDigit(str, index);
	}
	NumericLiteral(str: string, index: number) {
		return this.ecma_12_8_3.NumericLiteral(str, index);
	}
	StringLiteral(str: string, index: number) {
		return this.ecma_12_8_4.StringLiteral(str, index);
	}
	Template(str: string, index: number) {
		return this.ecma_12_8_6.Template(str, index);
	}
	LineTerminator(str: string, index: number) {
		return this.ecma_12_3.LineTerminator(str, index);
	}
	CharacterEscapeSequence(str: string, index: number) {
		return this.ecma_12_8_4.CharacterEscapeSequence(str, index);
	}
	LineTerminatorSequence(str: string, index: number) {
		return this.ecma_12_3.LineTerminatorSequence(str, index);
	}
	HexDigit(str: string, index: number) {
		return this.ecma_12_8_3.HexDigit(str, index);
	}
	CodePoint(str: string, index: number) {
		return this.ecma_12_8_6.CodePoint(str, index);
	}
	LineContinuation(str: string, index: number) {
		return this.ecma_12_8_4.LineContinuation(str, index);
	}
	OctalDigit(str: string, index: number) {
		return this.ecma_12_8_3.OctalDigit(str, index);
	}
	HexEscapeSequence(str: string, index: number) {
		return this.ecma_12_8_4.HexEscapeSequence(str, index);
	}
	UnicodeEscapeSequence(str: string, index: number) {
		return this.ecma_12_8_4.HexEscapeSequence(str, index);
	}
	RegularExpressionLiteral(str: string, index: number) {
		return this.ecma_12_8_5.RegularExpressionLiteral(str, index);
	}
	TemplateSubstitutionTail(str: string, index: number) {
		return this.ecma_12_8_6.TemplateSubstitutionTail(str, index);
	}
	WhiteSpace(str: string, index: number) {
		return this.ecma_12_2.WhiteSpace(str, index);
	}
	IdentifierPartChar(str: string, index: number) {
		return this.ecma_12_6.IdentifierPartChar(str, index);
	}
	InputElementDiv(str:string, index:number){
		return this.ecma_12.InputElementDiv(str, index);
	}
	InputElementRegExpOrTemplateTail(str:string, index:number){
		return this.ecma_12.InputElementRegExpOrTemplateTail(str, index);
	}
}
