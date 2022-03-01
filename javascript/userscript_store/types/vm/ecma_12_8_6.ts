import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class ecma_12_8_6 extends ecma_base {
	// https://tc39.es/ecma262/#prod-CodePoint
	CodePoint(str: string, index: number): ecma_return_type {
		let res = this.m_dispatcher.HexDigits(str, index);
		if(res[0]) {
			if(res[1] > 0 && typeof res[0] === 'string') {
				// but only if MV of HexDigits ≤ 0x10FFFF
				let MV = parseInt(res[0], 16);
				if(MV <= 0x10FFFF) {
					return ['CodePoint', res[1]];
				}
			}
		}
		return [null, 0];
	}
	/*TemplateMiddle ::*/
	/* | } TemplateCharacters opt ${*/
	/* TemplateTail ::*/
	/* | } TemplateCharacters opt `*/
	/* TemplateEscapeSequence ::*/
	TemplateEscapeSequence(str: string, index: number): ecma_return_type {
		/* CharacterEscapeSequence */
		let tmp = this.m_dispatcher.CharacterEscapeSequence(str, index);
		if(tmp[0]) {
			return [true, tmp[1]];
		}
		/* 0 [lookahead ∉ DecimalDigit]*/
		/* HexEscapeSequence*/
		/* UnicodeEscapeSequence*/
		let ct1: [string, number, false, Error] = [str, index, false, new Error("TODO")];
		let [, , ...ct_ret] = ct1;
		return ct_ret;
	}
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
	/* TemplateHead ::*/
	/* | ` TemplateCharacters opt ${*/
	/* | TemplateSubstitutionTail ::*/
	/* | TemplateMiddle*/
	/* | TemplateTail*/
	TemplateHead(str: string, index: number): ecma_return_type {
		let cur_index = index;
		// ` TemplateCharacters opt ${
		cur: if(str[cur_index] === '`') {
			cur_index++;
			let res = this.TemplateCharacters(str, cur_index);
			if(res[0] === false) throw res[1];
			if(res[1] > 0) {
				cur_index += res[1];
			}
			if(str[cur_index] === '$' && str[cur_index + 1] === '{') {
				return [true, cur_index + 2];
			}
		}
		// TemplateSubstitutionTail
		let cur = this.TemplateSubstitutionTail(str, index);
		if(cur[0] && cur[1] > 0) {
			return [true, cur[1]];
		}
		// TemplateMiddle
		cur = this.TemplateMiddle(str, index);
		if(cur[0] && cur[1] > 0) {
			return [true, cur[1]];
		}
		// TemplateTail
		cur = this.TemplateTail(str, index);
		if(cur[0] && cur[1] > 0) {
			return [true, cur[1]];
		}

	}
	// https://tc39.es/ecma262/#prod-TemplateMiddle
	TemplateMiddle(str: string, index: number): ecma_return_type {

	}
	// https://tc39.es/ecma262/#prod-TemplateTail
	TemplateTail(str: string, index: number): ecma_return_type {

	}
	// https://tc39.es/ecma262/#prod-TemplateSubstitutionTail
	TemplateSubstitutionTail(str: string, index: number): ecma_return_type {

	}
	/*Template ::*/
	/* | NoSubstitutionTemplate*/
	/* | TemplateHead*/
	public Template(str: string, index: number): ecma_return_type {
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
	/* TemplateCharacter ::*/
	/* | $ [lookahead ≠ {]*/
	/* | \ TemplateEscapeSequence*/
	/* | \ NotEscapeSequence*/
	/* | LineContinuation*/
	/* | LineTerminatorSequence*/
	/* | SourceCharacter but not one of ` or \ or $ or LineTerminator*/
	TemplateCharacter(str: string, index: number): ecma_return_type {
		if(str[index] === '$' && str[index + 1] !== '{') {
			return [true, 1];
		}
		if(str[index] === '\\') {
			let escape_res = this.TemplateEscapeSequence(str, index);
		}
	}
	/* TemplateCharacters ::*/
	/* | TemplateCharacter TemplateCharacters opt*/
	TemplateCharacters(str: string, index: number): ecma_return_type {
		let tmp = this.TemplateCharacter(str, index);
		while(tmp[0] === true) {
			tmp = this.TemplateCharacter(str, index);
		}
	}
	// https://tc39.es/ecma262/#prod-Template
	public NoSubstitutionTemplate(str: string, index: number): ecma_return_type {
		let cur_index = index;
		//` TemplateCharacters opt `
		if(str[cur_index] === '`') {
			cur_index++;
		} else {
			return [null, 0];
		}
		let opt = this.TemplateCharacters(str, index);
		if(opt[0] === false) {
			throw opt[1];
		}
	}
}
