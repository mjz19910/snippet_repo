import {Dispatcher} from "./Dispatcher.ts";
import {LexerStateData} from "./LexerStateData.ts";
import {LexReturnType} from "./LexReturnType.ts";
import {lexer_produce_input_or_regexp_or_template_tail} from "./lexer_produce_input_or_regexp_or_template_tail";
import {lex_js_input_or_div} from "./lex_js_input_or_div";
import {debug} from "./LexGrammarSyntax";



export function lex_js(state: LexerStateData,dispatcher: Dispatcher,str: string) {
	let res_arr: LexReturnType[]=[];
	state.cur_index=0;
	while(state.cur_index<=(str.length-1)) {
		let start_len=state.cur_index;
		lexer_produce_input_or_regexp_or_template_tail(state,dispatcher,str,res_arr);
		if(state.cur_index<=(str.length-1)) {
			let last=res_arr.pop();
			if(debug)
				console.log('not done');
			if(debug)
				console.log('last',last);
		}
		if(start_len===state.cur_index) {
			if(debug)
				console.log('length not changed');
			break;
		}
		start_len=state.cur_index;
		lex_js_input_or_div(state,dispatcher,str,res_arr);
		if(res_arr.length>0&&state.cur_index<=(str.length-1)) {
			let last=res_arr.pop();
			if(!last)
				throw new Error("Unreachable");
			if(last[0]) {
			}
			if(debug)
				console.log('not done');
			if(debug)
				console.log('last',last);
		} else {
			break;
		}
		if(start_len===state.cur_index) {
			console.log('length not changed');
			break;
		}
	}
	return res_arr;
}
