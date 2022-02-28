import {ecma_base} from "./ecma_base";

export class ecma_12_3 extends ecma_base {
	static _the:ecma_12_3|null=null;
	static the(): ecma_12_3 | undefined {
		if(this._the)
			return this._the;
		this._the = new this;
	}
	LineTerminator(str: string, index: number):[string, number] {
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
	LineTerminatorSequence() {
		console.info('LineTerminatorSequence not implemented');
	}
}
