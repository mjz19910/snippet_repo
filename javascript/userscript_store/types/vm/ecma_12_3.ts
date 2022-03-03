import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class ecma_12_3 extends ecma_base {
	// https://tc39.es/ecma262/#prod-LineTerminator
	LineTerminator(str: string, index: number): ecma_return_type {
		let len = 0;
		if(str[index] === '\r')
			len = 1;
		if(str[index] === '\n')
			len = 1;
		if(str[index] === '\u{2028}')
			len = 1;
		if(str[index] === '\u{2029}')
			len = 1;
		if(len > 0) {
			return ['LineTerminator', 1];
		}
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-LineTerminatorSequence
	LineTerminatorSequence(str:string, index:number): ecma_return_type {
		let len;
		// <LF>
		if(str[index] === '\u000a')return ["LineTerminatorSequence", 1];
		// <CR> [lookahead ≠ <LF>]
		if(str[index] === '\u000d' && str[index + 1] !== '\u000a')return ["LineTerminatorSequence", 1];
		// <LS>
		if(str[index] === '\u2028')return ["LineTerminatorSequence", 1];
		if(str[index] === '\u2029')return ["LineTerminatorSequence", 1];
		// <CR> <LF>
		if(str[index] === '\r' && str[index+1] === '\n')return ["LineTerminatorSequence", 2];
		return [null, 0];
	}
}
