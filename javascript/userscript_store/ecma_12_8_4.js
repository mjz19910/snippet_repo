import {ecma_base} from "./ecma_base";

export class ecma_12_8_4 extends ecma_base {
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	StringLiteral(str, index) {
		let cur = str[index];
		if(cur === '"') {
			if(str[index + 1] === '"') {
				return ['StringLiteral', 2];
			}
			let double_string_len = this.DoubleStringCharacters(str, index + 1);
			if(str[index + double_string_len + 1] === '"') {
				return ['StringLiteral', double_string_len + 2];
			}
			return [null, 0];
		}
		if(cur === "'") {
			if(str[index + 1] === "'") {
				return ['StringLiteral', 2];
			}
			let single_string_len = this.SingleStringCharacters(str, index + 1);
			if(str[index + single_string_len + 1] === "'") {
				return ['StringLiteral', single_string_len + 2];
			}
			return [null, 0];
		}
		return [null, 0];
	}
	/**
	 * @param {any} str
	 * @param {number} index
	 */
	DoubleStringCharacters(str, index) {
		let off = 0;
		for(; ;) {
			let len = this.DoubleStringCharacter(str, index + off);
			if(len > 0) {
				off++;
				continue;
			}
			break;
		}
		return off;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	DoubleStringCharacter(str, index) {
		x: {
			if(str[index] === '"') {
				return 0;
			}
			if(str[index] === '\\') {
				break x;
			}
			let len = this.LineTerminator(str, index);
			if(len > 0) {
				break x;
			}
			return 1;
		}
		if(str[index] === '\u{2028}') {
			return 1;
		}
		if(str[index] === '\u{2029}') {
			return 1;
		}
		if(str[index] === '\\') {
			let esc_len = this.EscapeSequence(str, index);
			return esc_len + 1;
		}
		let lc_len = this.LineContinuation(str, index);
		if(lc_len > 0) {
			return lc_len;
		}
		return 1;
	}
	/**
	 * @param {any} str
	 * @param {number} index
	 */
	SingleStringCharacters(str, index) {
		let off = 0;
		for(; ;) {
			let len = this.SingleStringCharacter(str, index + off);
			if(len > 0) {
				off++;
				continue;
			}
			break;
		}
		return off;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	SingleStringCharacter(str, index) {
		x: {
			if(str[index] === "'") {
				return 0;
			}
			if(str[index] === '\\') {
				break x;
			}
			let len = this.LineTerminator(str, index);
			if(len > 0) {
				break x;
			}
			return 1;
		}
		if(str[index] === '\u{2028}') {
			return 1;
		}
		if(str[index] === '\u{2029}') {
			return 1;
		}
		if(str[index] === '\\') {
			let esc_len = this.EscapeSequence(str, index);
			return esc_len + 1;
		}
		let lc_len = this.LineContinuation(str, index);
		if(lc_len > 0) {
			return lc_len;
		}
		return 1;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	LineContinuation(str, index) {
		if(str[index] === '\\') {
			let lt_len = this.LineTerminatorSequence(str, index + 1);
			if(lt_len > 0) {
				return lt_len + 1;
			}
			return 0;
		}
	}
	/* EscapeSequence ::*/
	/* | CharacterEscapeSequence*/
	/* | 0 [lookahead ∉ DecimalDigit]*/
	/* | LegacyOctalEscapeSequence*/
	/* | NonOctalDecimalEscapeSequence*/
	/* | HexEscapeSequence*/
	/* | UnicodeEscapeSequence*/
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	EscapeSequence(str, index) {
		let len = this.CharacterEscapeSequence(str, index);
		if(len > 0) {
			return len;
		}
		/* | 0 [lookahead ∉ DecimalDigit]*/
		x: {
			if(str[index] === '0') {
				let peek = this.DecimalDigit(str, index);
				if(peek > 0) {
					break x;
				}
				// \0 null escape found
				return 1;
			}
		}
		len = this.LegacyOctalEscapeSequence(str, index);
		if(len > 0) {
			return len;
		}
		len = this.NonOctalDecimalEscapeSequence(str, index);
		if(len > 0) {
			return len;
		}
		len = this.HexEscapeSequence(str, index);
		if(len > 0) {
			return len;
		}
		len = this.UnicodeEscapeSequence(str, index);
		if(len > 0) {
			return len;
		}
		return 0;
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	CharacterEscapeSequence(str, index) {
		let len = this.SingleEscapeCharacter(str, index);
		if(len > 0) {
			return len;
		}
		len = this.NonEscapeCharacter(str, index);
		if(len > 0) {
			return len;
		}
	}
	/**
	 * @param {{ [x: string]: any; }} str
	 * @param {number} index
	 */
	SingleEscapeCharacter(str, index) {
		let m_arr = ["'", '"', '\\', 'b', 'f', 'n', 'r', 't', 'v'];
		let cur = str[index];
		if(m_arr.includes(cur)) {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	NonEscapeCharacter(str, index) {
		if(this.EscapeCharacter(str, index)) {
			return 0;
		}
		if(this.LineTerminator(str, index)) {
			return 0;
		}
		return 1;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	EscapeCharacter(str, index) {
		let len0 = this.SingleEscapeCharacter(str, index);
		let len1 = this.DecimalDigit(str, index);
		let act = 0;
		if(len0 > len1) {
			act = 1;
		}
		if(str[index] === 'x') {
			return 1;
		}
		if(len0 > 0 && len0 >= len1) {
			return len0;
		}
		if(len1 > 0 && len1 > len0) {
			return len1;
		}
	}
	/*LegacyOctalEscapeSequence ::
	0 [lookahead ∈ { 8, 9 }]
	NonZeroOctalDigit [lookahead ∉ OctalDigit]
	ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
	FourToSeven OctalDigit
	ZeroToThree OctalDigit OctalDigit
	*/
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	LegacyOctalEscapeSequence(str, index) {
		x: {
			if(str[index] === '0') {
				if(str[index + 1] === '8' || str[index + 1] === '9') {
					return 1;
				}
				break x;
			}
		}
		x: {
			let len = this.NonZeroOctalDigit(str, index);
			if(len > 0) {
				let n_len = this.OctalDigit(str, index + 1);
				if(n_len > 0) {
					break x;
				}
				return 1;
			}
		}
		x: {
			let len = this.ZeroToThree(str, index);
			if(len > 0) {
				len = this.OctalDigit(str, index + 1);
				if(len > 0) {
					let n_len = this.OctalDigit(str, index + 2);
					if(n_len > 0) {
						break x;
					}
					return 2;
				}
			}
		}
		x: {
			let len = this.FourToSeven(str, index);
			if(len > 0) {
				len = this.OctalDigit(str, index + 1);
				if(len > 0) {
					return 2;
				}
			}
		}
		x: {
			let len = this.ZeroToThree(str, index);
			if(!len) {
				break x;
			}
			len = this.OctalDigit(str, index + 1);
			if(!len) {
				break x;
			}
			len = this.OctalDigit(str, index + 2);
			if(!len) {
				break x;
			}
			return 3;
		}

	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	NonZeroOctalDigit(str, index) {
		if(str[index] === '0') {
			return 0;
		}
		let len = this.OctalDigit(str, index);
		if(len > 0) {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {{ [x: string]: any; }} str
	 * @param {number} index
	 */
	ZeroToThree(str, index) {
		let cur = str[index];
		let chk = '0123';
		if(chk.includes(cur)) {
			return 1;
		}
		;
	}
	/**
	 * @param {{ [x: string]: any; }} str
	 * @param {number} index
	 */
	FourToSeven(str, index) {
		let cur = str[index];
		let chk = '4567';
		if(chk.includes(cur)) {
			return 1;
		}
		;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	NonOctalDecimalEscapeSequence(str, index) {
		if(str[index] === '8' || str[index] === '9') {
			return 1;
		}
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	HexEscapeSequence(str, index) {
		if(str[index] === 'x') {
			let len = this.HexDigit(str, index);
			if(!len) {
				return 0;
			}
			len = this.HexDigit(str, index + 1);
			if(!len) {
				return 0;
			}
			return 3;
		}
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	UnicodeEscapeSequence(str, index) {
		let off = 0;
		if(str[index] === 'u') {
			off++;
		}
		let len0 = this.Hex4Digits(str, index + off);
		if(len0 > 0) {
			return len0 + 1;
		}
		if(str[index + off] === '{}'[0]) {
			off++;
			let len = this.CodePoint(str, index + off);
			if(len > 0) {
				off += len;
				if(str[index + off] === '{}'[1]) {
					off++;
					return off;
				}
			}
		}
		return 0;
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	Hex4Digits(str, index) {
		let len = this.HexDigit(str, index);
		if(!len) {
			return 0;
		}
		len = this.HexDigit(str, index);
		if(!len0) {
			return 0;
		}
		len = this.HexDigit(str, index);
		if(!len) {
			return 0;
		}
		len = this.HexDigit(str, index);
		if(!len) {
			return 0;
		}
		return 4;
	}
}
