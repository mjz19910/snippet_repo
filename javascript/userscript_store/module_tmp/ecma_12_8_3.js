import {ecma_base} from "./ecma_base";

export class ecma_12_8_3 extends ecma_base {
	static _attach(root) {
		let exports = Object.getOwnPropertyNames(this.prototype);
		root.export(this, '12.8.3', exports);
	}
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	DecimalDigit(str, index) {
		if(str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57) {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	NumericLiteral(str, index) {
		let len = this.DecimalLiteral(str, index);
		if(len > 0) {
			return len;
		}
		return 0;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	DecimalLiteral(str, index) {
		if(str[index] === '0') {
			return 1;
		}
		let zd_len = this.NonZeroDigit(str, index);
		let off = 0;
		if(zd_len === 1) {
			off += 1;
			let ns_len = this.NumericLiteralSeparator(str, index + off);
			if(ns_len > 0) {
				off++;
			}
			let dd_len = this.DecimalDigits(str, index + off);
			return dd_len + off;
		}
		return off;
	}
	/**
	 * @param {any} str
	 * @param {number} index
	 */
	DecimalDigits(str, index) {
		let off = 0;
		for(; ;) {
			let len = this.DecimalDigit(str, index + off);
			if(len > 0) {
				off++;
				continue;
			}
			let s_len = this.NumericLiteralSeparator(str, index + off);
			if(s_len > 0) {
				let exl = this.DecimalDigit(str, index + off + 1);
				if(exl > 0) {
					off++;
					continue;
				}
				break;
			}
			break;
		}
		return off;
	}
	/**
	 * @param {string} str
	 * @param {any} index
	 */
	NonZeroDigit(str, index) {
		if(str.charCodeAt(index) >= 49 && str.charCodeAt(index) <= 57) {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	NumericLiteralSeparator(str, index) {
		if(str[index] === '_') {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	DecimalIntegerLiteral(str, index) {}
}
