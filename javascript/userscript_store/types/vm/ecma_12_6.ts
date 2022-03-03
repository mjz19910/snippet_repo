import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";
import {ecma_terminal} from "./ecma_terminal";

export class ecma_12_6 extends ecma_base {
	PrivateIdentifier(str: string, index: number): ecma_return_type {
		if(str[0] !== '#')
			return [null, 0];
		let cur = this.IdentifierName(str, index + 1);
		if(!cur[0]) return [null, 0];
		return ["PrivateIdentifier", cur[1] + 1];
	}
	static IdentifierName_not_start_regex = /[0-9a-zA-Z$_]+/g;
	IdentifierName(str: string, index: number): ecma_return_type {
		let res = this.IdentifierStart(str, index);
		if(!res[0]){
			console.log('not IdentifierName', str[index]);
			return [null, 0];
		}
		let [, id_start_len] = res;
		ecma_12_6.IdentifierName_not_start_regex.lastIndex = index + id_start_len;
		let id_continue_match = ecma_12_6.IdentifierName_not_start_regex.exec(str);
		if(!id_continue_match){
			console.log('IdentifierName is start only', str.slice(index, index+id_start_len));
			return ["IdentifierName", id_start_len];
		}
		let id_continue_len=0;
		if(id_continue_match.index == index + id_start_len){
			id_continue_len=id_continue_match[0].length;
		}
		console.log(str[index] + id_continue_match[0], id_continue_len);
		if(id_continue_len > 0){
			console.log('IdentifierName with continue', str.slice(index, index+id_start_len+id_continue_len));
			return ["IdentifierName", id_start_len+id_continue_len];
		}
		return [null, 0];
	}
	static id_continue_regex = /[a-zA-Z$_0-9]/;
	static id_start_regex = /[a-zA-Z$_]/;
	IdentifierStart(str: string, index: number): ecma_return_type {
		if(str[index] === '\\') {
			let res = this.m_dispatcher.UnicodeEscapeSequence(str, index + 1);
			if(res[0]) return ["IdentifierStart", res[1] + 1];
		}
		if(str[index].match(ecma_12_6.id_start_regex)) {
			return ["IdentifierStart", 1];
		}
		return [null, 0];
	}
	IdentifierPart(str: string, index: number): ecma_return_type {
		if(str[index].match(ecma_12_6.id_continue_regex)) {
			return ["IdentifierPart", 1];
		}
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-IdentifierPartChar
	IdentifierPartChar(str: string, index: number): ecma_return_type {
		// UnicodeIDContinue
		// FIXME: this is adhoc, it will break when tokenizing non ascii
		if(str[index].match(ecma_12_6.id_continue_regex)) {
			return ["IdentifierPartChar", 1];
		}
		// $
		if(str[index] === '$') return ["IdentifierPartChar", 1];
		// <ZWNJ>
		if(str[index] === '\u200C') return ["IdentifierPartChar", 1];
		// <ZWJ>
		if(str[index] === '\u200D') return ["IdentifierPartChar", 1];
		return [null, 0];
	}
	// https://tc39.es/ecma262/#prod-UnicodeIDContinue
	UnicodeIDContinue(str: string, index: number) {
		// FIXME: this is hard to support
	}
}

export async function run_tests() {
	new Promise(function(a) {
		setTimeout(a, 100);
	})
	console.log('run tests ecma 12.6');
	let code = `(function(){let the_var=12;})`;
	let test_2_code = `(class {#name=12;get name(){return this.#name}})`;
	let js_r1 = eval(code);
	let js_r2 = eval(test_2_code);
	let dispatcher = new Dispatcher;
	let term_lexer = new ecma_terminal(dispatcher);
	let cur_index = 0;
	let res_arr = [];
	let res = term_lexer.InputElementRegExpOrTemplateTail(code, 0);
	if(res[0]){
		cur_index+=res[1];
	}
	res_arr.push(res);
	while(res[0]) {
		res = term_lexer.InputElementRegExpOrTemplateTail(code, cur_index);
		res_arr.push(res);
		if(res[0]) {
			cur_index += res[1];
		}
	}
	cur_index=0;
	console.log(res_arr.map(e=>{
		if(e[0]){
			let ret=[e[0], code.slice(cur_index, cur_index+e[1])];
			cur_index+=e[1];
			return ret;
		}
		return ['End (null)', 0, code[cur_index]];
	}));
	console.log('Success');
}