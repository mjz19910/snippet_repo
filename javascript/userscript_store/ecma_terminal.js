import {ecma_base} from "./ecma_base";

export class ecma_terminal extends ecma_base {
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	InputElementDiv(str, index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, RightBracePunctuator
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.WhiteSpace(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.LineTerminator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.CommonToken(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.DivPunctuator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'div_pnt';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.RightBracePunctuator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	InputElementRegExp(str, index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken,
		// RightBracePunctuator, RegularExpressionLiteral
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.WhiteSpace(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.LineTerminator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.CommonToken(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.RightBracePunctuator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.RegularExpressionLiteral(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	InputElementRegExpOrTemplateTail(str, index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken, RegularExpressionLiteral, TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.WhiteSpace(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.LineTerminator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.CommonToken(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.RegularExpressionLiteral(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.TemplateSubstitutionTail(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	InputElementTemplateTail(str, index) {
		// WhiteSpace, LineTerminator, Comment, CommonToken, DivPunctuator, TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let rb_len, item, tree;
		let cur_res = this.WhiteSpace(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'whitespace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.LineTerminator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'line_term';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.Comment(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'comment';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.CommonToken(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'common';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.DivPunctuator(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.TemplateSubstitutionTail(str, index);
		if(cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
}
