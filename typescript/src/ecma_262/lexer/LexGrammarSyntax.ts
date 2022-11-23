import {ItemInfoType} from "../ItemInfoType.js";
import {LexerBase} from "./LexerBase.js";
import {LexReturnType} from "./LexReturnType.js";
import {run_test_1} from "./test/run_test_1.js";
import {run_test_2} from "./test/run_test_2.js";
import {produce_input_element_or_div} from "./produce_input_element_or_div";
import {lexer_produce_input_element} from "./lexer_produce_input_element";

export const debug=false;

export class LexGrammarSyntax extends LexerBase {
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

export function run_tests() {
	run_test_1();
	if(!!false) run_test_2();
}
