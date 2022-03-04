import {ecma_base} from "./LexerBase";
import {LexReturnType} from "./LexReturnType";

export class ecma_12_2 extends ecma_base {
	WhiteSpace(str: string, index: number):LexReturnType {
		if(str[index] === ' ') {
			return ['WhiteSpace', 1];
		}
		if(str[index] === '\t') {
			return ['WhiteSpace', 1];
		}
		return [null, 0];
	}
}
