import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";
import {ecma_terminal} from "./ecma_terminal";

export class ecma_12_6 extends ecma_base {
	PrivateIdentifier(str:string, index:number):ecma_return_type {
		if(str[0] !== '#')
			return [null, 0];
		let cur = this.IdentifierName(str, index + 1);
		if(!cur[0])return [null, 0];
		return [true, cur[1] + 1];
	}
	static IdentifierName_not_start_regex=/[0-9a-zA-Z$_]+/;
	IdentifierName(str:string, index:number):ecma_return_type {
		let res = this.IdentifierStart(str, index);
		if(!res[0])return [null, 0];
		let [, id_start_len]=res;
		ecma_12_6.IdentifierName_not_start_regex.lastIndex=index + id_start_len;
		let id_continue_match=ecma_12_6.IdentifierName_not_start_regex.exec(str);
		console.log(id_continue_match);
		throw 1;
		return [null, 0];
	}
	static id_continue_regex=/[a-zA-Z$_0-9]/;
	static id_start_regex=/[a-zA-Z$_]/;
	IdentifierStart(str:string, index:number):ecma_return_type {
		if(str[index] === '\\'){
			let res=this.m_dispatcher.UnicodeEscapeSequence(str, index + 1);
			if(res[0])return [true, res[1] + 1];
		}
		if(str[index].match(ecma_12_6.id_start_regex)) {
			return [true, 1];
		}
		return [null, 0];
	}
	IdentifierPart(str:string, index:number):ecma_return_type {
		if(str[index].match(ecma_12_6.id_continue_regex)) {
			return [true, 1];
		}
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-IdentifierPartChar
	IdentifierPartChar(str:string, index:number):ecma_return_type {
		// UnicodeIDContinue
		// FIXME: this is adhoc, it will break when tokenizing non ascii
		if(str[index].match(ecma_12_6.id_continue_regex)) {
			return [true, 1];
		}
		// $
		if(str[index] === '$')return [true, 1];
		// <ZWNJ>
		if(str[index] === '\u200C')return [true, 1];
		// <ZWJ>
		if(str[index] === '\u200D')return [true, 1];
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-UnicodeIDContinue
	UnicodeIDContinue(str:string, index:number){
		// FIXME: this is hard to support
	}
}

export function run_tests(){
	let code=`(function(){let the_var=12;})`;
	let test_2_code=`(class {#name=12;get name(){return this.#name}})`;
	let js_r1=eval(code);
	let js_r2=eval(test_2_code);
	let dispatcher=new Dispatcher;
	let term_lexer=new ecma_terminal(dispatcher);
	let res=term_lexer.InputElementDiv(code, 0);
	console.log(res);
}