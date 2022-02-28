import {ecma_base} from "./ecma_base";

export class ecma_12_8_6 extends ecma_base {
	/* TemplateHead ::*/
	/* | ` TemplateCharacters opt ${*/
	/* | TemplateSubstitutionTail ::*/
	/* | TemplateMiddle*/
	/* | TemplateTail*/
	/*TemplateMiddle ::*/
	/* | } TemplateCharacters opt ${*/
	/* TemplateTail ::*/
	/* | } TemplateCharacters opt `*/
	/* TemplateCharacters ::*/
	/* | TemplateCharacter TemplateCharacters opt*/
	/* TemplateCharacter ::*/
	/* | $ [lookahead ≠ {]*/
	/* | \ TemplateEscapeSequence*/
	/* | \ NotEscapeSequence*/
	/* | LineContinuation*/
	/* | LineTerminatorSequence*/
	/* | SourceCharacter but not one of ` or \ or $ or LineTerminator*/
	/* TemplateEscapeSequence ::*/
	/* | CharacterEscapeSequence*/
	/* | 0 [lookahead ∉ DecimalDigit]*/
	/* | HexEscapeSequence*/
	/* | UnicodeEscapeSequence*/
	/* NotEscapeSequence ::*/
	/* | 0 DecimalDigit*/
	/* | DecimalDigit but not 0*/
	/* | x [lookahead ∉ HexDigit]*/
	/* | x HexDigit [lookahead ∉ HexDigit]*/
	/* | u [lookahead ∉ HexDigit] [lookahead ≠ {]*/
	/* | u HexDigit [lookahead ∉ HexDigit]*/
	/* | u HexDigit HexDigit [lookahead ∉ HexDigit]*/
	/* | u HexDigit HexDigit HexDigit [lookahead ∉ HexDigit]*/
	/* | u { [lookahead ∉ HexDigit]*/
	/* | u { NotCodePoint [lookahead ∉ HexDigit]*/
	/* | u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]*/
	/* NotCodePoint ::*/
	/* | HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF*/
	/* CodePoint ::*/
	/* | HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF*/
	/*Template ::*/
	/* | NoSubstitutionTemplate*/
	/* | TemplateHead*/
	public Template(str:string, index:number) {
		let ret = this.NoSubstitutionTemplate(str, index);
		if(ret[1] > 0) {
			return ret;
		}
		ret = this.TemplateHead(str, index);
		if(ret[1] > 0) {
			return ret;
		}
		return [null, 0];
	}
	/* NoSubstitutionTemplate ::*/
	/* | ` TemplateCharacters opt `*/
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	public NoSubstitutionTemplate(str, index) {}
}
