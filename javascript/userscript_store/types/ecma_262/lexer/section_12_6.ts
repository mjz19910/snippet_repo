import {CanRunTest} from "types/tests_mod/CanRunTest"
import {TestLock} from "types/tests_mod/TestLock"
import {Dispatcher} from "./Dispatcher"
import {debug_flag_override,LexerBase} from "./LexerBase"
import {LexReturnType} from "./LexReturnType"
export class section_12_6 extends LexerBase {
	constructor(v: Dispatcher) {
		super(v)
		if(debug_flag_override) {
			this.debug=true
		}
	}
	debug=false
	PrivateIdentifier(str: string,index: number): LexReturnType {
		if(str[index]!=='#')
			return [null,0]
		let cur=this.IdentifierName(str,index+1)
		if(!cur[0]) return [null,0]
		return ["PrivateIdentifier",cur[1]+1]
	}
	static IdentifierName_not_start_regex=/[0-9a-zA-Z$_]+/g
	IdentifierName(str: string,index: number): LexReturnType {
		let res=this.IdentifierStart(str,index)
		if(!res[0]) {
			if(this.debug) console.log('not IdentifierName',str[index])
			return [null,0]
		}
		let [,id_start_len]=res
		section_12_6.IdentifierName_not_start_regex.lastIndex=index+id_start_len
		let id_continue_match=section_12_6.IdentifierName_not_start_regex.exec(str)
		if(!id_continue_match) {
			if(this.debug) console.log('IdentifierName is start only',str.slice(index,index+id_start_len))
			return ["IdentifierName",id_start_len]
		}
		let id_continue_len=0
		if(id_continue_match.index==index+id_start_len) {
			id_continue_len=id_continue_match[0].length
		}
		if(id_continue_len>0) {
			if(this.debug) console.log('IdentifierName with continue',str.slice(index,index+id_start_len+id_continue_len))
			return ["IdentifierName",id_start_len+id_continue_len]
		}
		return [null,0]
	}
	static id_continue_regex=/[a-zA-Z$_0-9]/
	static id_start_regex=/[a-zA-Z$_]/
	IdentifierStart(str: string,index: number): LexReturnType {
		if(index>=str.length) {
			return [null,0]
		}
		if(str[index]==='\\') {
			let res=this.m_dispatcher.UnicodeEscapeSequence(str,index+1)
			if(res[0]) return ["IdentifierStart",res[1]+1]
		}
		if(str[index].match(section_12_6.id_start_regex)) {
			return ["IdentifierStart",1]
		}
		return [null,0]
	}
	IdentifierPart(str: string,index: number): LexReturnType {
		if(str[index].match(section_12_6.id_continue_regex)) {
			return ["IdentifierPart",1]
		}
		return [null,0]
	}
	// https://tc39.es/ecma262/#prod-IdentifierPartChar
	IdentifierPartChar(str: string,index: number): LexReturnType {
		// UnicodeIDContinue
		// FIXME: this is adhoc, it will break when tokenizing non ascii
		if(str[index].match(section_12_6.id_continue_regex)) {
			return ["IdentifierPartChar",1]
		}
		// $
		if(str[index]==='$') return ["IdentifierPartChar",1]
		// <ZWNJ>
		if(str[index]==='\u200C') return ["IdentifierPartChar",1]
		// <ZWJ>
		if(str[index]==='\u200D') return ["IdentifierPartChar",1]
		return [null,0]
	}
	// https://tc39.es/ecma262/#prod-UnicodeIDContinue
	UnicodeIDContinue(str: string,index: number) {
		// FIXME: this is hard to support
	}
}

export function run_tests(test_runner: CanRunTest,lock: TestLock) {
	test_runner.start_async(run_tests_impl,test_runner,lock)
}

export async function run_tests_impl(test_runner: CanRunTest,lock: TestLock) {
	// TODO: write tests for ECMA262: 12.6 (Javascript Identifiers), not checking from ecma_terminal
	// console.error("TODO: ecma_12_6")
	await lock.lock()
	test_runner.report_test_success()
	await lock.unlock()
}
