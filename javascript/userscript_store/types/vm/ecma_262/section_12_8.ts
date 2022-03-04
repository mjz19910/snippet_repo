import {ecma_base} from "./LexerBase";
import {ecma_return_type} from "./LexReturnType";

export class ecma_12_8 extends ecma_base {
	public RegularExpressionNonTerminator(str:string, index:number):ecma_return_type {
		let ret = this.m_dispatcher.LineTerminator(str, index);
		if(ret[0] && ret[1] === 0) {
			return ["RegularExpressionNonTerminator", 1];
		}
		return [null, 0];
	}
}
