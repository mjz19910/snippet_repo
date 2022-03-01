import {SyntaxError} from "./SyntaxError";

export class RustSimpleTokenizer {
	constructor() {
		this.index = 0;
		this.source = null;
	}
	/**
	 * @param {any} str
	 */
	reset(str) {
		this.index = 0;
		this.source = str;
	}
	/**
	 * @param {number} tok_len
	 */
	advance(tok_len) {
		this.index += tok_len;
	}
	/**
	 * @param {number} char_code
	 */
	inIdentRange(char_code) {
		// Regex: /[a-zA-Z_]/
		if(char_code >= 0x41 && char_code <= 0x5a) {
			return true;
		}
		if(char_code >= 0x61 && char_code <= 0x7a) {
			return true;
		}
		if(char_code == 0x5f)
			return true;
		return false;
	}
	/**
	 * @param {any} char_code
	 */
	isWhitespaceRange(char_code) {
		// Regex: /[ \t\n]/
		switch(char_code) {
			case 0x09:
				return true;
			case 0x0a:
				return true;
			case 0x20:
				return true;
		}
		return false;
	}
	/**
	 * @param {any} str
	 */
	exec(str) {
		let separator_vec = "{}()<>";
		let operator_vec = ".,=:";
		let tok_arr = [];
		if(this.source !== str) {
			this.reset(str);
		}
		let parse_enum = [0, 1, 2, 3, 4, 5, 6, 7];
		let parse_enum_invalid = parse_enum[0];
		let parse_enum_identifier = parse_enum[1];
		//let parse_enum_keyword=parse_enum[2];
		//let parse_enum_separator=parse_enum[3];
		let parse_enum_operator = parse_enum[4];
		//let parse_enum_literal=parse_enum[5];
		//let parse_enum_comment=parse_enum[6];
		let parse_enum_whitespace = parse_enum[7];
		for(; this.index < this.source.length;) {
			if(this.source[this.index] === ':' && this.source[this.index + 1] === ':') {
				tok_arr.push([parse_enum_operator, '::']);
				this.advance(2);
				continue;
			}
			let cur_char = this.source[this.index];
			if(separator_vec.includes(cur_char)) {
				tok_arr.push();
				this.advance(1);
				continue;
			}
			if(operator_vec.includes(operator_vec)) {
				tok_arr.push([parse_enum_operator, cur_char]);
				this.advance(1);
				continue;
			}
			let cur_char_code = this.source.charCodeAt(this.index);
			if(this.inIdentRange(cur_char_code)) {
				let len = 1;
				while(this.inIdentRange(this.source.charCodeAt(this.index + len)) && this.index + len < this.source.length) {
					len++;
				}
				tok_arr.push([parse_enum_identifier, this.source.slice(this.index, this.index + len)]);
				this.advance(len);
				continue;
			};
			if(this.isWhitespaceRange(cur_char_code)) {
				tok_arr.push([parse_enum_whitespace, cur_char]);
				this.advance(1);
				continue;
			}
			tok_arr.push([parse_enum_invalid, cur_char]);
			this.advance(1);
			continue;
		}
		return tok_arr;
	}
	/**@returns {never} */
	bad_state() {
		throw new Error("BadState");
	}
	/**
	 * @param {any[][]} tok_arr
	 */
	into_tt(tok_arr) {
		let parse_enum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		//let parse_enum_invalid = parse_enum[0];
		//let parse_enum_identifier = parse_enum[1];
		//let parse_enum_keyword = parse_enum[2];
		let parse_enum_separator = parse_enum[3];
		//let parse_enum_operator = parse_enum[4];
		//let parse_enum_literal = parse_enum[5];
		//let parse_enum_comment = parse_enum[6];
		//let parse_enum_whitespace = parse_enum[7];
		let parse_enum_token_tree_item = parse_enum[8];
		let parse_enum_token_tree_body = parse_enum[9];
		let separator_open_vec = "{}"[0] + "()"[0] + "<>"[0];
		let separator_close_vec = "{}"[1] + "()"[1] + "<>"[1];
		/**@type {any[][]} */
		let tt_stack = [];
		/**@type {any[]|undefined} */
		let tt_item = [];
		let cur_tt_vec;
		for(let x of tok_arr) {
			if(x[0] !== parse_enum_separator) {
				if(tt_item)
					tt_item.push(x);
				else
					throw new Error("Bad state");
				continue;
			}
			let cur = x[1];
			if(separator_open_vec.includes(cur)) {
				if(tt_item)
					tt_stack.push(tt_item);
				else
					throw new Error("Bad state");
				tt_item = [parse_enum_token_tree_item, x];
				tt_stack.push(tt_item);
				tt_item = [parse_enum_token_tree_body];
				continue;
			}
			if(separator_close_vec.includes(cur)) {
				if(!tt_stack.length) {
					throw SyntaxError('unbalanced token tree');
				}
				cur_tt_vec = tt_stack.pop();
				if(cur_tt_vec)
					cur_tt_vec.push(tt_item);
				else
					this.bad_state();
				if(cur_tt_vec)
					cur_tt_vec.push(x);
				else
					this.bad_state();
				tt_item = tt_stack.pop();
				if(tt_item)
					tt_item.push(cur_tt_vec);
				else
					this.bad_state();
				continue;
			}
			if(tt_item)
				tt_item.push(x);
			else
				this.bad_state();
		}
		if(tt_stack.length) {
			throw SyntaxError('unexpected eof');
		}
		return tt_item;
	}
}
