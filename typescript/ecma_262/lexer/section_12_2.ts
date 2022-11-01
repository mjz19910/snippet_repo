import {LexerBase} from "./LexerBase.js"
import {LexReturnType} from "./LexReturnType.js"
export class section_12_2 extends LexerBase {
	WhiteSpace(str: string,index: number): LexReturnType {
		if(str[index]===' ') {
			return ['WhiteSpace',1]
		}
		if(str[index]==='\t') {
			return ['WhiteSpace',1]
		}
		return [null,0]
	}
}
