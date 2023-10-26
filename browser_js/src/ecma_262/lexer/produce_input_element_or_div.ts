import {item_info_type_to_string} from "../item_info_type_to_string.ts";
import {ItemInfoType} from "../ItemInfoType.ts";
import {Dispatcher} from "./Dispatcher.ts";
import {LexReturnType} from "./LexReturnType.ts";
import {debug} from "./LexGrammarSyntax";
import {lexer_produce_input_element} from "./lexer_produce_input_element";

export function produce_input_element_or_div(ecma_dispatcher: Dispatcher,str: string,index: number): LexReturnType {
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
