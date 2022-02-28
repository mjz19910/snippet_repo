import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class ecma_12_7 extends ecma_base {
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	Punctuator(str: string, index: number):ecma_return_type {
		var len = 0, type = null, ret;
		ret = this.OptionalChainingPunctuator(str, index);
		if(ret[1] > len) {
			type = ret[0];
			len = ret[1];
		}
		ret = this.OtherPunctuator(str, index);
		if(ret[1] > len) {
			type = ret[0];
			len = ret[1];
		}
		return [type, len];
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	OptionalChainingPunctuator(str: string, index: number):ecma_return_type {
		if(str.slice(index, index + 2) === '?.') {
			let [, num_len] = this.DecimalDigit(str, index + 2);
			if(num_len > 0) {
				return [null, 0];
			}
			return ["OptionalChainingPunctuator", 2];
		}
		return [null, 0];
	}
	private DecimalDigit(str: string, index: number):ecma_return_type {
		return this.m_dispatcher.DecimalDigit(str, index);
	}
	_OtherPunctuator_vec = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
	OtherPunctuator(str: string, index: any) {
		let char_length = 0;
		for(let punctuator of this._OtherPunctuator_vec) {
			if(str.startsWith(punctuator, index)) {
				if(punctuator.length > char_length) {
					char_length = punctuator.length;
				}
			}
		}
		return ["OtherPunctuator", char_length];
	}
	_DivPunctuator_vec = "/ /=".split(' ');
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	DivPunctuator(str, index) {
		let char_length = 0;
		let max_len = 2;
		for(let punctuator of this._DivPunctuator_vec) {
			if(str.startsWith(punctuator, index)) {
				if(punctuator.length > char_length) {
					char_length = punctuator.length;
				}
				if(char_length === max_len) {
					break;
				}
			}
		}
		return ["DivPunctuator", char_length];
	}
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	RightBracePunctuator(str, index) {
		if(str.startsWith('{}'[1], index)) {
			return ['RightBracePunctuator', 1];
		}
		return [null, 0];
	}
}
