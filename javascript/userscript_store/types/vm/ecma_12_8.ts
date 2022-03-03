import {ecma_base} from "./ecma_base";

export class ecma_12_8 extends ecma_base {
	public RegularExpressionNonTerminator(str:string, index:number) {
		let ret = this.m_dispatcher.LineTerminator(str, index);
		if(ret[0] && ret[1] === 0) {
			return [1, ['regexpNonTerm'], null];
		}
		return [0, null, null];
	}
}
