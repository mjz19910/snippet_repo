import {ItemInfoType} from "../ItemInfoType.ts";
import {LexerBase} from "./LexerBase.ts";
import {LexReturnType} from "./LexReturnType.ts";
import {run_test_1} from "./test/run_test_1.js";
import {run_test_2} from "./test/run_test_2.js";
import {produce_input_element_or_div} from "./produce_input_element_or_div";
import {lexer_produce_input_element} from "./lexer_produce_input_element";
import {Test} from "../Test.ts";

export const debug=false;

// https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar
export class LexGrammarSyntax extends LexerBase {
	// https://tc39.es/ecma262/#prod-InputElementDiv
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
	// https://tc39.es/ecma262/#prod-InputElementRegExp
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
	// https://tc39.es/ecma262/#prod-InputElementRegExpOrTemplateTail
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
	// https://tc39.es/ecma262/#prod-InputElementTemplateTail
	InputElementTemplateTail(str: string,index: number): LexReturnType {
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
	// https://tc39.es/ecma262/#prod-InputElementHashbangOrRegExp
	InputElementHashbangOrRegExp(str: string,index: number): LexReturnType {
		let max_item=null,max_val=0;
		let item_info: ItemInfoType|null=null;
		void item_info;
		let cur_res=lexer_produce_input_element(this.m_dispatcher,str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.InputElement;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.HashbangComment(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			item_info=ItemInfoType.HashbangComment;
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		cur_res=this.m_dispatcher.RegularExpressionLiteral(str,index);
		if(cur_res[0]&&cur_res[1]>max_val) {
			//item_info = 'r_brace';
			max_item=cur_res[0];
			max_val=cur_res[1];
		}
		return [max_item,max_val];
	}
}

export function run_tests() {
	run_test_1(Test);
	if(!!false) run_test_2(Test);
}
