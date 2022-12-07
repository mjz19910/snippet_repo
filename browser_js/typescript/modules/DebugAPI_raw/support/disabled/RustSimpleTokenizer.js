export class RustSimpleTokenizer {
	constructor() {
		this.index=0;
		this.source=null;
		let codes=this.m_separators.map(e => e.charCodeAt(0));
		this.m_separator_char_codes=codes;
	}
	/**
	 * @param {any} str
	 */
	reset(str) {
		this.index=0;
		this.source=str;
	}
	/**
	 * @param {number} tok_len
	 */
	advance(tok_len) {
		this.index+=tok_len;
	}
	/**
	 * @param {number} char_code
	 */
	is_identifier(char_code) {
		// Regex: /[a-zA-Z_]/
		if(char_code>=0x41&&char_code<=0x5a) {
			return true;
		}
		if(char_code>=0x61&&char_code<=0x7a) {
			return true;
		}
		if(char_code==0x5f)
			return true;
		return false;
	}
	/**
	 * @param {any} char_code
	 */
	is_whitespace(char_code) {
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
	m_separators=["{","}","(",")","<",">"];
	/**@type {number[]} */
	m_separator_char_codes;
	/** @param {number} char_code */
	is_separator(char_code) {
		return this.m_separators.findIndex(e => e.charCodeAt(0)===char_code)>=0;
	}
	/** @param {string} str */
	str_to_tokens(str) {
		let separator_vec="{}()<>";
		let operator_vec=".,=:";
		let tok_arr=[];
		if(this.source!==str) {
			this.reset(str);
		}
		let parse_enum=[0,1,2,3,4,5,6,7];
		let parse_enum_invalid=parse_enum[0];
		let parse_enum_identifier=parse_enum[1];
		//let parse_enum_keyword=parse_enum[2]
		//let parse_enum_separator=parse_enum[3]
		let parse_enum_operator=parse_enum[4];
		//let parse_enum_literal=parse_enum[5]
		//let parse_enum_comment=parse_enum[6]
		let parse_enum_whitespace=parse_enum[7];
		for(;this.index<this.source.length;) {
			if(this.source[this.index]===':'&&this.source[this.index+1]===':') {
				tok_arr.push([parse_enum_operator,'::']);
				this.advance(2);
				continue;
			}
			let cur_char=this.source[this.index];
			if(separator_vec.includes(cur_char)) {
				tok_arr.push();
				this.advance(1);
				continue;
			}
			if(operator_vec.includes(cur_char)) {
				tok_arr.push([parse_enum_operator,cur_char]);
				this.advance(1);
				continue;
			}
			let cur_char_code=this.source.charCodeAt(this.index);
			if(this.is_identifier(cur_char_code)) {
				let len=1;
				while(this.is_identifier(this.source.charCodeAt(this.index+len))&&this.index+len<this.source.length) {
					len++;
				}
				tok_arr.push([parse_enum_identifier,this.source.slice(this.index,this.index+len)]);
				this.advance(len);
				continue;
			}
			if(this.is_whitespace(cur_char_code)) {
				tok_arr.push([parse_enum_whitespace,cur_char]);
				this.advance(1);
				continue;
			}
			tok_arr.push([parse_enum_invalid,cur_char]);
			this.advance(1);
			continue;
		}
		return tok_arr;
	}
	/**
	 * @param {any[][]} tok_arr
	 */
	into_tt(tok_arr) {
		let parse_enum=[0,1,2,3,4,5,6,7,8,9];
		//let parse_enum_invalid = parse_enum[0]
		//let parse_enum_identifier = parse_enum[1]
		//let parse_enum_keyword = parse_enum[2]
		let parse_enum_separator=parse_enum[3];
		//let parse_enum_operator = parse_enum[4]
		//let parse_enum_literal = parse_enum[5]
		//let parse_enum_comment = parse_enum[6]
		//let parse_enum_whitespace = parse_enum[7]
		let parse_enum_token_tree_item=parse_enum[8];
		let parse_enum_token_tree_body=parse_enum[9];
		let separator_open_vec="{}"[0]+"()"[0]+"<>"[0];
		let separator_close_vec="{}"[1]+"()"[1]+"<>"[1];
		let tt_stack=[];
		/**@type {any[]} */
		let tt_item=[];
		let cur_tt_vec;
		for(let x of tok_arr) {
			if(x[0]!==parse_enum_separator) {
				tt_item.push(x);
				continue;
			}
			let cur=x[1];
			if(separator_open_vec.includes(cur)) {
				tt_stack.push(tt_item);
				tt_item=[parse_enum_token_tree_item,x];
				tt_stack.push(tt_item);
				tt_item=[parse_enum_token_tree_body];
				continue;
			}
			if(separator_close_vec.includes(cur)) {
				if(!tt_stack.length) {
					throw SyntaxError('unbalanced token tree');
				}
				cur_tt_vec=tt_stack.pop();
				if(!cur_tt_vec)
					throw new Error("token stack underflow");
				cur_tt_vec.push(tt_item);
				cur_tt_vec.push(x);
				{
					let tt_item=tt_stack.pop();
					if(!tt_item)
						throw new Error("token stack underflow");
					tt_item.push(cur_tt_vec);
				}
				continue;
			}
			tt_item.push(x);
		}
		if(tt_stack.length) {
			throw SyntaxError('unexpected eof');
		}
		return tt_item;
	}
}
