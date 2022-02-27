import {ecma_base} from "./ecma_base";

export class ecma_12_2 extends ecma_base {
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	WhiteSpace(str, index) {
		if(str[index] === ' ') {
			return ['WhiteSpace', 1];
		}
		if(str[index] === '\t') {
			return ['WhiteSpace', 1];
		}
		return [null, 0];
	}
}
