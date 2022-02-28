import {ecma_base} from "./ecma_base";

export class ecma_12_8 extends ecma_base {
	public RegularExpressionNonTerminator(str:string) {
		let _val = this.LineTerminator(str);
		if(_val[0] === 0) {
			return [1, ['regexpNonTerm'], null];
		}
		return [0, null, null];
	}
}
