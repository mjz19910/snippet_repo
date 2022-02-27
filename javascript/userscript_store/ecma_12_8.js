import {ecma_base} from "./ecma_base";

export class ecma_12_8 extends ecma_base {
	static the() {
		if(ecma_12_8._the)
			return ecma_12_8._the;
		ecma_12_8._the = new ecma_12_8;
	}
	/**
	 * @param {any} str
	 */
	RegularExpressionNonTerminator(str) {
		let _val = this.LineTerminator(str);
		if(_val[0] === 0) {
			return [1, ['regexpNonTerm'], null];
		}
		return [0, null, null];
	}
}
