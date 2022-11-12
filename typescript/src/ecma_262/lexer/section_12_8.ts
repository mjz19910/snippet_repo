import {LexerBase} from "./LexerBase.js"
import {LexReturnType} from "./LexReturnType.js"

export class section_12_8 extends LexerBase {
	RegularExpressionNonTerminator(str: string,index: number): LexReturnType {
		let ret=this.m_dispatcher.LineTerminator(str,index)
		if(ret[0]&&ret[1]===0) {
			return ["RegularExpressionNonTerminator",1]
		}
		return [null,0]
	}
}
