import {item_info_type_to_string} from "../item_info_type_to_string.js";
import {ItemInfoType} from "../ItemInfoType.js";
import {Dispatcher} from "./Dispatcher.js";
import {LexReturnType} from "./LexReturnType.js";
import {debug} from "./LexGrammarSyntax";


export function lexer_produce_input_element(ecma_dispatcher: Dispatcher,str: string,index: number): LexReturnType {
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
	if(debug)
		console.log(item_info_type_to_string(item_info));
	return [max_item,max_val];
}
