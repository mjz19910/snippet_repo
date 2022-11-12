import {ParserBase} from "./ParserBase.js";
import {ParseReturnType} from "./ParseReturnType.js";

export class section_14_16 extends ParserBase {
	DebuggerStatement(str: string,index: number): ParseReturnType {
		let len=0;
		if(str.startsWith("debugger",index+len)) {
			len+="debugger".length;
			if(str[index+len]===';') {
				return [true,len+1];
			}
		}
		return [null,0];
	}
}