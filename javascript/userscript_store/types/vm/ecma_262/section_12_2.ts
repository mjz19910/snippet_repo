import {ecma_base} from "./LexerBase";
import {ecma_return_type} from "./LexReturnType";

export class ecma_12_2 extends ecma_base {
	public WhiteSpace(str: string, index: number):ecma_return_type {
		if(str[index] === ' ') {
			return ['WhiteSpace', 1];
		}
		if(str[index] === '\t') {
			return ['WhiteSpace', 1];
		}
		return [null, 0];
	}
}
