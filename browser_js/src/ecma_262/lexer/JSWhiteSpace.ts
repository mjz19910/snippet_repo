import {LexerBase} from "./LexerBase.ts";
import {LexReturnType} from "./LexReturnType.ts";
// https://tc39.es/ecma262/#sec-white-space
export class JSWhiteSpace extends LexerBase {
	// https://tc39.es/ecma262/#prod-WhiteSpace
	WhiteSpace(str: string,index: number): LexReturnType {
		if(str[index]===' ') {
			return ['WhiteSpace',1];
		}
		if(str[index]==='\t') {
			return ['WhiteSpace',1];
		}
		return [null,0];
	}
}
