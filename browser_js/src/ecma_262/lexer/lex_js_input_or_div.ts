import {Dispatcher} from "./Dispatcher.js";
import {LexerStateData} from "./LexerStateData.js";
import {LexReturnType} from "./LexReturnType.js";

export function lex_js_input_or_div(state: LexerStateData,term_lexer: Dispatcher,str: string,res_arr: LexReturnType[]) {
	let res=term_lexer.InputElementDiv(str,state.cur_index);
	if(res[0]) {
		state.cur_index+=res[1];
	}
	res_arr.push(res);
	do {
		res=term_lexer.InputElementDiv(str,state.cur_index);
		res_arr.push(res);
		if(!res[0])
			continue;
		state.cur_index+=res[1];
	} while(res[0]);
}
