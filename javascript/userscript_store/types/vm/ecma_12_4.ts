import {ecma_base} from "./ecma_base";
import {JSParseError} from "./JSParseError";

export class ecma_12_4 extends ecma_base {
	/**
	 * @param {any} str
	 * @param {any} index
	 */
	Comment(str, index) {
		let ml_len = this.MultiLineComment(str, index);
		let sl_len = this.SingleLineComment(str, index);
		if(!ml_len)
			throw new JSParseError("no MultiLineComment");
		if(!sl_len)
			throw new JSParseError("no SingleLineComment");
		if(ml_len[1] && ml_len[1] > 0) {
			return ml_len;
		}
		if(sl_len[1] && sl_len[1] > 0) {
			return sl_len;
		}
		return [null, 0];
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	MultiLineComment(str, index) {
		let off = 0;
		if(str.slice(index, index + 2) === '/*') {
			off += 2;
			if(str.slice(index + off, index + off + 2) === '*/') {
				return ['MultiLineComment', 4];
			}
			let com_len = this.MultiLineCommentChars(str, index + off);
			if(com_len === 0) {
				return [null, 0];
			}
			console.log([str.slice(index, index + off + com_len + 2)]);
			if(str.slice(index + off + com_len, index + off + com_len + 2) === "*/") {
				return ['MultiLineComment', off + com_len + 2];
			}
		}
		return [null, 0];
	}
	dep = 0;
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	MultiLineCommentChars(str, index) {
		let slen = 0;
		if(this.dep > 64) {
			throw Error('stack overflow');
		}
		this.dep++;
		let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
		if(ml_na > 0) {
			slen++;
			for(; ;) {
				let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
				if(ml_na > 0) {
					slen += ml_na;
					continue;
				}
				if(str[index + slen] === '*') {
					let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
					if(pac > 0) {
						slen++;
						slen += pac;
					}
				}
				break;
			}
		}
		if(str[index + slen] === '*') {
			let pac = this.PostAsteriskCommentChars(str, index + slen + 1);
			if(pac > 0) {
				slen++;
				slen += pac;
			}
		}
		this.dep--;
		return slen;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 * @returns {number}
	 */
	PostAsteriskCommentChars(str, index) {
		let idxoff = 0;
		let cxlen = this.MultiLineNotForwardSlashOrAsteriskChar(str, index + idxoff);
		if(cxlen > 0) {
			idxoff += cxlen;
			let la = this.MultiLineCommentChars(str, index + idxoff);
			idxoff += la;
			return idxoff;
		}
		if(cxlen === 0) {
			if(str[index + idxoff] === '*') {
				idxoff++;
				let len = this.PostAsteriskCommentChars(str, index + idxoff);
				if(len > 0) {
					return len + idxoff;
				}
			}
		}
		return idxoff;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	MultiLineNotAsteriskChar(str, index) {
		if(str[index] !== '*') {
			return 1;
		}
		return 0;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	MultiLineNotForwardSlashOrAsteriskChar(str, index) {
		if(str[index] === '*' || str[index] === '/') {
			return 0;
		}
		return 1;
	}
	/**
	 * @param {string} str
	 * @param {number} index
	 */
	SingleLineComment(str, index) {
		if(str.slice(index, index + 2) === '//') {
			let comment_length = this.SingleLineCommentChars(str, index + 2);
			return ['SingleLineComment', comment_length + 2];
		}
		return [null, 0];
	}
	/**
	 * @param {string | any[]} str
	 * @param {number} index
	 */
	SingleLineCommentChars(str, index) {
		let s_index = index;
		while(str[s_index] !== '\n') {
			s_index++;
			if(s_index > str.length) {
				break;
			}
		}
		return s_index - index;
	}
}
