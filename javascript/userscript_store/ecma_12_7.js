import {ecma_base} from "./ecma_base";

export class ecma_12_7 extends ecma_base {
	/**
	 * @param {any} root
	 */
	static _attach(root) {
		let test_class = new ecma_12_7();
		// import the instance variables by constructing the class
		let instance_var_vec = Object.getOwnPropertyNames(test_class);
		for(let x of instance_var_vec) {
			this.prototype[x] = test_class[x];
		}
		super._attach(root);
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	Punctuator(str, index) {
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
	OptionalChainingPunctuator(str, index) {
		if(str.slice(index, index + 2) === '?.') {
			let num_len = this.DecimalDigit(str, index + 2);
			if(num_len > 0) {
				return [null, 0];
			}
			return ["OptionalChainingPunctuator", 2];
		}
		return [null, 0];
	}
	_OtherPunctuator_vec = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	OtherPunctuator(str, index) {
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
