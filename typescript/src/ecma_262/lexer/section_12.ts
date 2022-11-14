import {item_info_type_to_string} from "../item_info_type_to_string.js";
import {ItemInfoType} from "../ItemInfoType.js";
import {Dispatcher} from "./Dispatcher.js";
import {LexerBase} from "./LexerBase.js";
import {LexerStateData} from "./LexerStateData.js";
import {LexReturnType} from "./LexReturnType.js";
import {run_test_1} from "./test/run_test_1.js";
import {run_test_2} from "./test/run_test_2.js";
import {lexer_format_callback} from "./lexer_format_callback.js";

function lexer_produce_input_element(ecma_dispatcher: Dispatcher,str: string,index: number): LexReturnType {
	let max_item=null,max_val=0;
	let item_info=null;
	let cur_res=ecma_dispatcher.WhiteSpace(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.WhiteSpace;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	cur_res=ecma_dispatcher.LineTerminator(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.LineTerminator;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	cur_res=ecma_dispatcher.Comment(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.Comment;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	cur_res=ecma_dispatcher.CommonToken(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.CommonToken;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	if(debug) console.log(item_info_type_to_string(item_info));
	return [max_item,max_val];
}

const debug=false;

function produce_input_element_or_div(ecma_dispatcher: Dispatcher,str: string,index: number): LexReturnType {
	let max_item=null,max_val=0;
	let item_info: ItemInfoType|null=null;
	let cur_res=lexer_produce_input_element(ecma_dispatcher,str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.InputElement;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	cur_res=ecma_dispatcher.DivPunctuator(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.DivPunctuator;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	cur_res=ecma_dispatcher.RightBracePunctuator(str,index);
	if(cur_res[0]&&cur_res[1]>max_val) {
		item_info=ItemInfoType.RightBracePunctuator;
		max_item=cur_res[0];
		max_val=cur_res[1];
	}
	if(debug) {
		console.log('lex_input_element_or_div',item_info_type_to_string(item_info));
	}
	return [max_item,max_val];
}

export class Lexer extends LexerBase {
	do_let_parse(str: string,index: number,outputs: LexReturnType[]=[]) {
		void outputs;
		let res1=this.m_dispatcher.InputElementRegExpOrTemplateTail(str,index);
		if(!res1[0]) {
			outputs.push([null,0]);
			return;
		}
		outputs.push(res1);
		return res1;
	}
}

export class section_12 extends LexerBase {
	InputElementDiv(str: string,index: number): LexReturnType {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator,
		// RightBracePunctuator
		// !RegularExpressionLiteral
		// !TemplateSubstitutionTail
		let ret=produce_input_element_or_div(this.m_dispatcher,str,index);
		if(ret[0]) {
			return ret;
		} else {
			return [null,0];
		}
	}
	InputElementRegExp(str: string,index: number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// !DivPunctuator
		// RightBracePunctuator
		// RegularExpressionLiteral
		// !TemplateSubstitutionTail
		let max_item=null,max_val=0;
		let item_info: ItemInfoType|null=null;
		void item_info;
		let cur_res=lexer_produce_input_element(this.m_dispatcher,str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.InputElement;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.RightBracePunctuator(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			//max_item = 'r_brace'
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.RegularExpressionLiteral(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			//max_item = 'r_brace'
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		return [max_item,max_val];
	}
	InputElementRegExpOrTemplateTail(str: string,index: number): LexReturnType {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RegularExpressionLiteral,
		// TemplateSubstitutionTail
		let max_item=null,max_val=0;
		let item_info: ItemInfoType|null=null;
		void item_info;
		let cur_res=lexer_produce_input_element(this.m_dispatcher,str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.InputElement;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.RegularExpressionLiteral(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			//max_item = 'r_brace'
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.TemplateSubstitutionTail(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			//max_item = 'r_brace'
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		return [max_item,max_val];
	}
	InputElementTemplateTail(str: string,index: number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator
		// TemplateSubstitutionTail
		let max_item=null,max_val=0;
		let item_info: ItemInfoType|null=null;
		void item_info;
		let cur_res=lexer_produce_input_element(this.m_dispatcher,str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.InputElement;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.DivPunctuator(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.DivPunctuator;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.TemplateSubstitutionTail(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.TemplateSubstitutionTail;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		return [max_item,max_val];
	}
}


function lexer_produce_input_or_regexp_or_template_tail(state: LexerStateData,dispatcher: Dispatcher,str: string,res_arr: LexReturnType[]) {
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
					let res_arr_inner: LexReturnType[]=[];
					dispatcher.lexer.do_let_parse(str,state.cur_index,res_arr_inner);
					console.log('parsed let def',res_arr_inner.map(lexer_format_callback.bind(null,state,str)));
					for(let val of res_arr_inner) {
						if(val[0]) {
							state.cur_index+=val[1];
						}
					}
				} continue;
			}
			state.cur_index+=res[1];
		}
	}
}

function ecma_262_lex_js_input_or_div(state: LexerStateData,term_lexer: Dispatcher,str: string,res_arr: LexReturnType[]) {
	let res=term_lexer.InputElementDiv(str,state.cur_index);
	if(res[0]) {
		state.cur_index+=res[1];
	}
	res_arr.push(res);
	do {
		res=term_lexer.InputElementDiv(str,state.cur_index);
		res_arr.push(res);
		if(!res[0]) continue;
		state.cur_index+=res[1];
	} while(res[0]);
}

export function lex_js(state: LexerStateData,dispatcher: Dispatcher,str: string) {
	let res_arr: LexReturnType[]=[];
	state.cur_index=0;
	while(state.cur_index<=(str.length-1)) {
		let start_len=state.cur_index;
		lexer_produce_input_or_regexp_or_template_tail(state,dispatcher,str,res_arr);
		if(state.cur_index<=(str.length-1)) {
			let last=res_arr.pop();
			if(debug) console.log('not done');
			if(debug) console.log('last',last);
		}
		if(start_len===state.cur_index) {
			if(debug) console.log('length not changed');
			break;
		}
		start_len=state.cur_index;
		ecma_262_lex_js_input_or_div(state,dispatcher,str,res_arr);
		if(res_arr.length>0&&state.cur_index<=(str.length-1)) {
			let last=res_arr.pop();
			if(!last) throw new Error("Unreachable");
			if(last[0]) {

			}
			if(debug) console.log('not done');
			if(debug) console.log('last',last);
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

export function run_tests() {
	run_test_1();
	run_test_2();
}
