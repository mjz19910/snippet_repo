import {Dispatcher} from "./Dispatcher.js";
import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";
import {StopIteration} from "./StopIteration";


export class Lexer extends LexerBase {
	str: string;
	index: number;
	outputs: LexReturnType[];
	constructor(dispatcher: Dispatcher,str: string) {
		super(dispatcher);
		this.str=str;
		this.index=0;
		this.outputs=[];
	}
	parse_one_element() {
		let res=this.m_dispatcher.InputElementRegExpOrTemplateTail(this.str,this.index);
		if(!res[0]) {
			this.outputs.push([null,0]);
			throw new StopIteration();
		}
		this.index+=res[1];
		this.outputs.push(res);
	}
	get_last_token() {
		let last=this.get_last_info();
		if(!last[0])
			throw new StopIteration();
		return this.str.slice(this.index-last[1],this.index);
	}
	get_last_info() {
		let last=this.outputs.at(-1);
		if(!last)
			throw new StopIteration();
		return last;
	}
	do_let_parse() {
		try {
			this.parse_one_element();
			let last_token=this.get_last_token();
			if(last_token!=='let')
				return;
			this.parse_one_element();
			let last=this.get_last_info();
			console.log(last[0]);
			this.parse_one_element();
			this.parse_one_element();
			this.parse_one_element();
			this.parse_one_element();
			last_token=this.get_last_token();
			if(last_token===';')
				return;
		} catch(val) {
			if(val instanceof StopIteration) {} else {
				throw val;
			}
		}
		return;
	}
}
