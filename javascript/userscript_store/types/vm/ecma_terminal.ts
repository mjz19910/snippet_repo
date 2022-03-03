import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

export class ecma_terminal extends ecma_base {
	InputElementDiv(str:string, index:number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.m_dispatcher.WhiteSpace(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.LineTerminator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.Comment(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.CommonToken(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.DivPunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'div_pnt';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RightBracePunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	InputElementRegExp(str:string, index:number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken,
		// RightBracePunctuator, RegularExpressionLiteral
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.m_dispatcher.WhiteSpace(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.LineTerminator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.CommonToken(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RightBracePunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RegularExpressionLiteral(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	InputElementRegExpOrTemplateTail(str:string, index:number):ecma_return_type {
		// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let cur_res = this.m_dispatcher.WhiteSpace(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.LineTerminator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.Comment(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.CommonToken(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RegularExpressionLiteral(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.TemplateSubstitutionTail(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	InputElementTemplateTail(str:string, index:number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.m_dispatcher.WhiteSpace(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.LineTerminator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.CommonToken(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.DivPunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.TemplateSubstitutionTail(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
}
