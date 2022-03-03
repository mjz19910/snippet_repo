import {DispatcherType} from "types/vm/DispatcherType.js";
import {ecma_12_3} from "./ecma_12_3";
import {ecma_12_5} from "./ecma_12_5";
import {ecma_12_6} from "./ecma_12_6";
import {ecma_12_7} from "./ecma_12_7";
import {ecma_12_8_3} from "./ecma_12_8_3";
import {ecma_12_8_4} from "./ecma_12_8_4";
import {ecma_12_8_6} from "./ecma_12_8_6";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class Dispatcher implements DispatcherType {
	HexDigits(str:string, index:number) {
		return this.ecma_12_8_3.HexDigits(str, index);
	}
	[x:string]:((str:string, index:number)=>ecma_return_type) | ecma_base;
	ecma_12_3:ecma_12_3=new ecma_12_3(this);
	ecma_12_5:ecma_12_5=new ecma_12_5(this);
	ecma_12_6:ecma_12_6=new ecma_12_6(this);
	ecma_12_7:ecma_12_7=new ecma_12_7(this);
	ecma_12_8_3:ecma_12_8_3=new ecma_12_8_3(this);
	ecma_12_8_4:ecma_12_8_4=new ecma_12_8_4(this);
	ecma_12_8_6:ecma_12_8_6=new ecma_12_8_6(this);
	IdentifierName(str:string, index:number) {
		return this.ecma_12_6.IdentifierName(str, index);
	}
	PrivateIdentifier(str:string, index:number) {
		return this.ecma_12_6.PrivateIdentifier(str, index);
	}
	Punctuator(str:string, index:number) {
		return this.ecma_12_7.Punctuator(str, index);
	}
	DecimalDigit(str:string, index:number) {
		return this.ecma_12_8_3.DecimalDigit(str, index);
	}
	NumericLiteral(str: string, index: number) {
		return this.ecma_12_8_3.NumericLiteral(str, index);
	}
	StringLiteral(str: string, index: number) {
		return this.ecma_12_8_4.StringLiteral(str, index);
	}
	Template(str: string, index: number) {
		console.log('Template');
		return this.ecma_12_8_6.Template(str, index);
	}
	LineTerminator(str:string, index:number) {
		return this.ecma_12_3.LineTerminator(str, index);
	}
	CharacterEscapeSequence(str:string, index:number) {
		return this.ecma_12_8_4.CharacterEscapeSequence(str, index);
	}
	LineTerminatorSequence(str:string, index:number){
		return this.ecma_12_3.LineTerminatorSequence(str, index);
	}
	HexDigit(str:string, index:number){
		return this.ecma_12_8_3.HexDigit(str, index);
	}
	CodePoint(str:string, index:number){
		return this.ecma_12_8_6.CodePoint(str, index);
	}
	LineContinuation(str:string, index:number) {
		return this.ecma_12_8_4.LineContinuation(str, index);
	}
	OctalDigit(str:string, index:number){
		return this.ecma_12_8_3.OctalDigit(str, index);
	}
	HexEscapeSequence(str:string, index:number) {
		return this.ecma_12_8_4.HexEscapeSequence(str, index);
	}
	UnicodeEscapeSequence(str: string, index: number){
		return this.ecma_12_8_4.HexEscapeSequence(str, index);
	}
	RegularExpressionLiteral(str:string, index:number){
		return this
	}
	TemplateSubstitutionTail(str:string, index:number){
		return this;
	}
}
