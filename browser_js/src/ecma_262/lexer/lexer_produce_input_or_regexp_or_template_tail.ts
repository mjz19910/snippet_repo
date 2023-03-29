import {Dispatcher} from "./Dispatcher.js";
import {LexerStateData} from "./LexerStateData.js";
import {LexReturnType} from "./LexReturnType.js";
import {lexer_format_callback} from "./lexer_format_callback.js";

export function lexer_produce_input_or_regexp_or_template_tail(state: LexerStateData,dispatcher: Dispatcher,str: string,res_arr: LexReturnType[]) {
	let res=dispatcher.InputElementRegExpOrTemplateTail(str,state.cur_index);
	if(res[0]) {
		state.cur_index+=res[1];
	}
	res_arr.push(res);
	while(res[0]) {
		res=dispatcher.InputElementRegExpOrTemplateTail(str,state.cur_index);
		res_arr.push(res);
		if(res[0]) {
			let mat=str.slice(state.cur_index,state.cur_index+res[1]);
			switch(mat) {
				case 'let': {
					res_arr.pop();
					let res_arr_inner: LexReturnType[]=[];
					dispatcher.lexer.index=state.cur_index;
					dispatcher.lexer.outputs=res_arr_inner;
					dispatcher.lexer.do_let_parse();
					console.log('parsed let def');
					console.log(res_arr_inner.map(lexer_format_callback.bind(null,state,str)));
					res_arr.push(...res_arr_inner);
					state.cur_index=dispatcher.lexer.index;
				} continue;
			}
			state.cur_index+=res[1];
		}
	}
}
