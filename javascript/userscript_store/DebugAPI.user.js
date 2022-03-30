// ==UserScript==
// @name         global DebugAPI userscript
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  global DebugAPI userscript snippet from https://github.com/mjz19910/snippet_repo/blob/master/javascript/userscript_store/DebugAPI.user.js
// @author       @mjz19910
// @match        https://*/*
// @match        http://*/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.meta.js
// @downloadURL  https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.user.js
// ==/UserScript==
/* Copyright 2019-2022 @mjz19910 */
/* eslint-disable no-undef */

let g_api={};
window.g_api=g_api;
class Repeat {
	static map=new Map;
	static get(value, times) {
		if(!this.map.has(value)){
			this.map.set(value, new Map);
		}
		let tm_map=this.map.get(value);
		if(tm_map.has(times)){
			return tm_map.get(times);
		} else {
			let rep=new this(value,times);
			tm_map.set(times, rep);
			return rep;
		}
	}
	constructor(value, times){
		this.value=value;
		this.times=times;
	}
	toString(){
		return this.value + "x" + this.times;
	}
};
g_api.Repeat=Repeat;
class CompressRepeated {
		/** @param {string | any[]} src @param {string | any[]} dst */
	did_compress(src, dst){
		return dst.length < src.length;
	}
	/** @param {string | any[]} src @param {string | any[]} dst */
	did_decompress(src, dst){
		return dst.length > src.length;
	}
	/** @param {string[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	compress_result(src, dst){
		if(this.did_compress(src, dst))return [true, dst];
		return [false, src];
	}
	/** @param {string[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src, dst) {
		if(this.did_decompress(src, dst))return [true, dst];
		return [false, dst];
	}
	static can_compress_items(arr){
		for(let i=0;i<arr.length;i++){
			let item=arr[i];
			if(typeof item !== 'string')return false;
			if(item.match(/[a-zA-Z]/) === null)return false;
		}
		return true;
	}
	/** @param {string[]} arr */
	try_compress(arr){
		let ret=[];
		for (let i=0;i<arr.length;i++){
			let item=arr[i];
			if(i+1 < arr.length && item === arr[i+1]) {
				let off=0;
				while(item === arr[i+off+1])off++;
				if(off > 0) {
					let rep_count=off+1;
					ret.push(Repeat.get(item, rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr, ret);
	}
	/** @param {string[]} arr */
	try_decompress(arr){
		let ret=[];
		for (let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item)continue;
			if(item instanceof Repeat) {
				let {value, times}=item;
				for(let j=0;j<times;j++)ret.push(value);
				continue;
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr, ret);
	}
	/** @param {string[]} arr */
	compress_array(arr) {
		let success, res;
		[success, res]=this.try_decompress(arr);
		if(success)arr=res;
		[success, res]=this.try_compress(arr);
		if(success)return res;
		return arr;
	}
}
window.g_api.CompressRepeated=CompressRepeated;
/**@type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys, values){
	/**@type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++){
		let k=keys[i];
		let v=values[i];
		/**@type {[typeof k, typeof v]} */
		let item=[k, v];
		ret.push(item);
	}
	return ret;
}
window.g_api.to_tuple_arr=to_tuple_arr;
function does_range_match(arr, idx, range) {
	for(let i=0;i<range.length;i++){
		if(arr[idx+i] !== range[i])return false;
	}
	return true;
}
class CompressionStatsCalculator {
	constructor(){
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
		/** @type {any[]} */
		this.real=[];
	}
	/** @param {number} index */
	add_hit(index) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index]=1;
		} else this.hit_counts[index]++;
	}
	/** @param {string} key */
	add_item(key, real) {
		let index=this.cache.indexOf(key);
		if(index == -1) {
			this.real.push(real);
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset(){
		this.cache.length=0;
		this.hit_counts.length=0;
		this.real.length=0;
	}
	/** @param {any[]} arr @param {number} win_size */
	calc_compression_stats(arr, win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++){
			if(i+win_size < arr.length) {
				let arr_slice=arr.slice(i, i+win_size);
				this.add_item(arr_slice.join(","), arr_slice);
			}
		}
		return to_tuple_arr(to_tuple_arr(this.cache, this.real), this.hit_counts);
	}
	replace_range(arr, range, range_replacement){
		if(range.length <= 0)return arr;
		let ret=[];
		for(let i=0;i<arr.length;i++){
			if(does_range_match(arr, i, range)){
				i+=range.length-1;
				ret.push(range_replacement);
				continue;
			};
			ret.push(arr[i]);
		}
		return ret;
	}
}
window.CompressionStatsCalculator=CompressionStatsCalculator;
class HexRandomDataGenerator {
	constructor() {
		this.random_num = Math.random();
		this.used_bits = 0;
		/**@type {{value:number,bit_count:number}} */
		this.cur_part = {};
	}
	reset() {
		this.random_num = Math.random();
		this.used_bits = 0;
	}
	next(bit_count) {
		let random_size = 1 << bit_count;
		let num = ~~(this.random_num * random_size);
		this.used_bits += bit_count;
		this.random_num *= random_size;
		this.random_num -= num;
		return num;
	}
	reset_part() {
		this.cur_part = null;
	}
	next_part(bit_count) {
		let cur_num = this.next(bit_count);
		if(this.used_bits >= 48) {
			console.log('before_rng_reset', this.random_num);
			this.reset();
		}
		if(this.cur_part) {
			cur_num += this.cur_part.value * bit_count;
			bit_count += this.cur_part.bit_count;
			this.cur_part = {
				value: cur_num,
				bit_count,
			};
		} else {
			this.cur_part = {
				value: cur_num,
				bit_count: bit_count
			};
		}
	}
	complete() {
		return this.cur_part.value;
	}
	next_byte() {
		let size = 1 << 8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num = this.complete();
		return (size + num).toString(16).slice(1);
	}
}
let random_data_generator = new HexRandomDataGenerator;
class EventListenerValue {
	/**
	 * @param {GenericEventListenerOrEventListenerObject|null} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback, options) {
		/**@type {GenericEventListenerOrEventListenerObject|null} */
		this.callback = callback;
		/**@type {boolean | EventListenerOptions} */
		this.options = options;
	}
}
class GenericEvent {
	#default_prevented = false;
	type = 'unknown';
	/**@param {string} type */
	constructor(type) {
		if(type) {
			this.type = type;
		}
	}
	preventDefault() {
		this.#default_prevented = true;
	}
	get defaultPrevented() {
		return this.#default_prevented;
	}
}
class GenericDataEvent extends GenericEvent {
	constructor(type, data) {
		super(type);
		this.data = data;
	}
}
window.GenericDataEvent = GenericDataEvent;
class GenericEventTarget {
	constructor() {
		/**@type {Map<string,EventListenerValue[]>} */
		this._events = new Map;
	}
	/**
	 * @param {string} type
	 * @param {GenericEventListenerOrEventListenerObject | null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	addEventListener(type, callback, options) {
		let cur_event_vec = this._events.get(type);
		if(!cur_event_vec) {
			cur_event_vec = [];
			this._events.set(type, cur_event_vec);
		}
		cur_event_vec.push(new EventListenerValue(callback, options));
	}
	/**
	 * @param {string} type
	 * @param {GenericEventListenerOrEventListenerObject|null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	removeEventListener(type, callback, options) {
		let cur_event_vec = this._events.get(type);
		if(!cur_event_vec)
			return;
		if(cur_event_vec.length == 0)
			return;
		for(let i = cur_event_vec.length - 1;i >= 0;i--) {
			let cur = cur_event_vec[i];
			if(cur.callback !== callback)
				continue;
			if(cur.options !== options)
				continue;
			cur.callback = null;
			cur_event_vec.splice(i, 1);
		}
	}
	/**
	 * @param {GenericEvent} event
	 * @returns {boolean}
	 */
	dispatchEvent(event) {
		let event_type = event.type;
		let cur_event_vec = this._events.get(event_type);
		if(!cur_event_vec)
			return;
		let cur_event_vec_owned = cur_event_vec.slice();
		let can_handle = false;
		for(let i = 0;i < cur_event_vec_owned.length;i++) {
			let cur = cur_event_vec_owned[i];
			let callback = cur.callback;
			if(callback === null)
				continue;
			if(typeof callback === 'function') {
				callback(event);
				can_handle = true;
				continue;
			}
			if(callback.handleEvent && typeof callback.handleEvent === 'function') {
				callback.handleEvent(event);
				can_handle = true;
			}
		}
		return can_handle;
	}
}
const static_event_target = new GenericEventTarget;
class Dumper {
	/**@type {null} */
	dump_value = null;
	dump_value(value) {
		this.dump_value = value;
		this.dump_value = null;
	}
}
const local_dumper = new Dumper;
class RustSimpleTokenizer {
	constructor() {
		this.index = 0;
		this.source = null;
	}
	reset(str) {
		this.index = 0;
		this.source = str;
	}
	advance(tok_len) {
		this.index += tok_len;
	}
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
	exec(str) {
		let seperator_vec = "{}()<>";
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
		for(;this.index < this.source.length;) {
			if(this.source[this.index] === ':' && this.source[this.index + 1] === ':') {
				tok_arr.push([parse_enum_operator, '::']);
				this.advance(2);
				continue;
			}
			let cur_char = this.source[this.index];
			if(seperator_vec.includes(cur_char)) {
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
		let seperator_open_vec = "{}"[0] + "()"[0] + "<>"[0];
		let seperator_close_vec = "{}"[1] + "()"[1] + "<>"[1];
		let tt_stack = [];
		let tt_item = [];
		let cur_tt_vec;
		for(let x of tok_arr) {
			if(x[0] !== parse_enum_separator) {
				tt_item.push(x);
				continue;
			}
			let cur = x[1];
			if(seperator_open_vec.includes(cur)) {
				tt_stack.push(tt_item);
				tt_item = [parse_enum_token_tree_item, x];
				tt_stack.push(tt_item);
				tt_item = [parse_enum_token_tree_body];
				continue;
			}
			if(seperator_close_vec.includes(cur)) {
				if(!tt_stack.length) {
					throw SyntaxError('unbalanced token tree');
				}
				cur_tt_vec = tt_stack.pop();
				cur_tt_vec.push(tt_item);
				cur_tt_vec.push(x);
				tt_item = tt_stack.pop();
				tt_item.push(cur_tt_vec);
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
class RustSimpleParser {
	tokenizer = new RustSimpleTokenizer;
	simple_type_info(str) {
		// let iter_index = 0;
		this.tokenizer.reset(str);
		let token_vec = this.tokenizer.exec(str);
		let tt_root = this.tokenizer.into_tt(token_vec);
		let trg_obj = {
			body: tt_root[0]
		};
		return trg_obj;
	}
	result_ok_option_any_example() {
		let simple_type_info_str = "{value:Result<_, ()>={discriminant:Result::discriminant=Result::Ok,value:Option<any>={discriminant:Option::discriminant=Option::Some,value=root.value}}}";
		let ret = this.simple_type_info(simple_type_info_str);
		return ret;
	}
}
class SimpleJavascriptParser {
	token_generator = null;
	ecma_262_factory() {
		let ecma_sections = [];
		class ecma_base {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				let ecma_section_name = this.name.slice(5).replaceAll('_', '.');
				root.export(this, ecma_section_name, exports);
			}
		}
		class ecma_12_2 extends ecma_base {
			WhiteSpace(str, index) {
				if(str[index] === ' ') {
					return ['WhiteSpace', 1];
				}
				if(str[index] === '\t') {
					return ['WhiteSpace', 1];
				}
				return [null, 0];
			}
		}
		ecma_sections.push(ecma_12_2);
		class ecma_12_3 extends ecma_base {
			static the() {
				if(this._the)
					return this._the;
				this._the = new this;
			}
			LineTerminator(str, index) {
				let len = 0;
				if(str[index] === '\r')
					len = 1;
				if(str[index] === '\n')
					len = 1;
				if(str[index] === '\u{2028}')
					len = 1;
				if(str[index] === '\u{2029}')
					len = 1;
				if(len > 0) {
					return ['LineTerminator', 1];
				}
				return [null, 0];
			}
			LineTerminatorSequence() {
				console.info('LineTerminatorSequence not implimented');
			}
		}
		ecma_sections.push(ecma_12_3);
		class ecma_12_4 extends ecma_base {
			Comment(str, index) {
				let ml_len = this.MultiLineComment(str, index);
				let sl_len = this.SingleLineComment(str, index);
				if(ml_len[1] > 0) {
					return ml_len;
				}
				if(sl_len[1] > 0) {
					return sl_len;
				}
				return [null, 0];
			}
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
			MultiLineCommentChars(str, index) {
				this.dep ??= 0;
				let slen = 0;
				if(this.dep > 64) {
					throw Error('stack overflow');
				}
				this.dep++;
				let ml_na = this.MultiLineNotAsteriskChar(str, index + slen);
				if(ml_na > 0) {
					slen++;
					for(;;) {
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
			MultiLineNotAsteriskChar(str, index) {
				if(str[index] !== '*') {
					return 1;
				}
				return 0;
			}
			MultiLineNotForwardSlashOrAsteriskChar(str, index) {
				if(str[index] === '*' || str[index] === '/') {
					return 0;
				}
				return 1;
			}
			SingleLineComment(str, index) {
				if(str.slice(index, index + 2) === '//') {
					let comlen = this.SingleLineCommentChars(str, index + 2);
					return ['SingleLineComment', comlen + 2];
				}
				return [null, 0];
			}
			SingleLineCommentChars(str, index) {
				let sidx = index;
				while(str[sidx] !== '\n') {
					sidx++;
					if(sidx > str.length) {
						break;
					}
				}
				return sidx - index;
			}
		}
		ecma_sections.push(ecma_12_4);
		class ecma_12_5 extends ecma_base {
			CommonToken(str, index) {
				let cur = null
				, type = null
				, len = 0;
				let common_token = ['IdentifierName', 'PrivateIdentifier', 'Punctuator', 'NumericLiteral', 'StringLiteral', 'Template'];
				for(let m_name of common_token) {
					cur = this[m_name](str, index);
					if(cur[1] > len) {
						type = cur[0];
						len = cur[1];
					}
				}
				return [type, len];
			}
		}
		ecma_sections.push(ecma_12_5);
		class ecma_12_6 extends ecma_base {
			PrivateIdentifier(str, index) {
				if(str[0] !== '#')
					return [null, 0];
				let cur = this.IdentifierName(src, index + 1);
				return cur[1] + 1;
			}
			IdentifierName(str, index) {
				let ids = this.IdentifierStart(str, index);
				if(ids > 0) {
					for(;;) {
						let len = this.IdentifierPart(str, index + ids);
						if(len === 0) {
							break;
						}
						ids++;
					}
					return ['IdentifierName', ids];
				}
				return [null, 0];
			}
			IdentifierStart(str, index) {
				if(str[index].match(/[a-zA-Z$_]/)) {
					return 1;
				}
				return 0;
			}
			IdentifierPart(str, index) {
				if(str[index].match(/[a-zA-Z$_0-9]/)) {
					return 1;
				}
				return 0;
			}
		}
		ecma_sections.push(ecma_12_6);
		class ecma_12_7 extends ecma_base {
			static _attach(root) {
				let test_class = new ecma_12_7();
				// import the instance variables by constructing the class
				let instance_var_vec = Object.getOwnPropertyNames(test_class);
				for(let x of instance_var_vec) {
					this.prototype[x] = test_class[x];
				}
				super._attach(root);
			}
			Punctuator(str, index) {
				var len = 0, type = null, ret;
				ret = this.OptionalChainingPunctuator(str, index);
				if(ret[1] > len) {
					type = ret[0];
					len = ret[1];
				}
				ret = this.OtherPunctuator(str, index);
				if(ret[1] > len) {
					type = ret[0];
					len = ret[1];
				}
				return [type, len];
			}
			OptionalChainingPunctuator(str, index) {
				if(str.slice(index, index + 2) === '?.') {
					let num_len = this.DecimalDigit(str, index + 2);
					if(num_len > 0) {
						return [null, 0];
					}
					return ["OptionalChainingPunctuator", 2];
				}
				return [null, 0];
			}
			_OtherPunctuator_vec = "{ ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ?? ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= &&= ||= ??= =>".split(' ');
			OtherPunctuator(str, index) {
				let char_length = 0;
				for(let punctuator of this._OtherPunctuator_vec) {
					if(str.startsWith(punctuator, index)) {
						if(punctuator.length > char_length) {
							char_length = punctuator.length;
						}
					}
				}
				return ["OtherPunctuator", char_length];
			}
			_DivPunctuator_vec = "/ /=".split(' ');
			DivPunctuator(str, index) {
				let char_length = 0;
				let max_len = 2;
				for(let punctuator of this._DivPunctuator_vec) {
					if(str.startsWith(punctuator, index)) {
						if(punctuator.length > char_length) {
							char_length = punctuator.length;
						}
						if(char_length === max_len) {
							break;
						}
					}
				}
				return ["DivPunctuator", char_length];
			}
			RightBracePunctuator(str, index) {
				if(str.startsWith('{}'[1], index)) {
					return ['RightBracePunctuator', 1];
				}
				return [null, 0];
			}
		}
		ecma_sections.push(ecma_12_7);
		class ecma_12_8 extends ecma_base {
			static the() {
				if(ecma_12_8._the)
					return ecma_12_8._the;
				ecma_12_8._the = new ecma_12_8;
			}
			RegularExpressionNonTerminator(str) {
				let _val = this.LineTerminator(str);
				if(_val[0] === 0) {
					return [1, ['regexpNonTerm'], null];
				}
				return [0, null, null];
			}
		}
		ecma_sections.push(ecma_12_8);
		class ecma_12_8_3 extends ecma_base {
			static _attach(root) {
				let exports = Object.getOwnPropertyNames(this.prototype);
				root.export(this, '12.8.3', exports);
			}
			DecimalDigit(str, index) {
				if(str.charCodeAt(index) >= 48 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteral(str, index) {
				let len = this.DecimalLiteral(str, index);
				if(len > 0) {
					return len;
				}
				return 0;
			}
			DecimalLiteral(str, index) {
				if(str[index] === '0') {
					return 1;
				}
				let zd_len = this.NonZeroDigit(str, index);
				let off = 0;
				if(zd_len === 1) {
					off += 1;
					let ns_len = this.NumericLiteralSeparator(str, index + off);
					if(ns_len > 0) {
						off++;
					}
					let dd_len = this.DecimalDigits(str, index + off);
					return dd_len + off;
				}
				return off;
			}
			DecimalDigits(str, index) {
				let off = 0;
				for(;;) {
					let len = this.DecimalDigit(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					let s_len = this.NumericLiteralSeparator(str, index + off);
					if(s_len > 0) {
						let exl = this.DecimalDigit(str, index + off + 1);
						if(exl > 0) {
							off++;
							continue;
						}
						break;
					}
					break;
				}
				return off;
			}
			NonZeroDigit(str, index) {
				if(str.charCodeAt(index) >= 49 && str.charCodeAt(index) <= 57) {
					return 1;
				}
				return 0;
			}
			NumericLiteralSeparator(str, index) {
				if(str[index] === '_') {
					return 1;
				}
				return 0;
			}
			DecimalIntegerLiteral(str, index) {}
		}
		ecma_sections.push(ecma_12_8_3);
		class ecma_12_8_4 extends ecma_base {
			StringLiteral(str, index) {
				let cur = str[index];
				if(cur === '"') {
					if(str[index + 1] === '"') {
						return ['StringLiteral', 2];
					}
					let dslen = this.DoubleStringCharacters(str, index + 1);
					if(str[index + dslen + 1] === '"') {
						return ['StringLiteral', dslen + 2];
					}
					return [null, 0];
				}
				if(cur === "'") {
					if(str[index + 1] === "'") {
						return ['StringLiteral', 2];
					}
					let sslen = this.SingleStringCharacters(str, index + 1);
					if(str[index + sslen + 1] === "'") {
						return ['StringLiteral', sslen + 2];
					}
					return [null, 0];
				}
				return [null, 0];
			}
			DoubleStringCharacters(str, index) {
				let off = 0;
				for(;;) {
					let len = this.DoubleStringCharacter(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			DoubleStringCharacter(str, index) {
				x: {
					if(str[index] === '"') {
						return 0;
					}
					if(str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if(len > 0) {
						break x;
					}
					return 1;
				}
				if(str[index] === '\u{2028}') {
					return 1;
				}
				if(str[index] === '\u{2029}') {
					return 1;
				}
				if(str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if(lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			SingleStringCharacters(str, index) {
				let off = 0;
				for(;;) {
					let len = this.SingleStringCharacter(str, index + off);
					if(len > 0) {
						off++;
						continue;
					}
					break;
				}
				return off;
			}
			SingleStringCharacter(str, index) {
				x: {
					if(str[index] === "'") {
						return 0;
					}
					if(str[index] === '\\') {
						break x;
					}
					let len = this.LineTerminator(str, index);
					if(len > 0) {
						break x;
					}
					return 1;
				}
				if(str[index] === '\u{2028}') {
					return 1;
				}
				if(str[index] === '\u{2029}') {
					return 1;
				}
				if(str[index] === '\\') {
					let esc_len = this.EscapeSequence(str, index);
					return esc_len + 1;
				}
				let lc_len = this.LineContinuation(str, index);
				if(lc_len > 0) {
					return lc_len;
				}
				return 1;
			}
			LineContinuation(str, index) {
				if(str[index] === '\\') {
					let lt_len = this.LineTerminatorSequence(str, index + 1);
					if(lt_len > 0) {
						return lt_len + 1;
					}
					return 0;
				}
			}
			/* EscapeSequence ::*/
			/* | CharacterEscapeSequence*/
			/* | 0 [lookahead ∉ DecimalDigit]*/
			/* | LegacyOctalEscapeSequence*/
			/* | NonOctalDecimalEscapeSequence*/
			/* | HexEscapeSequence*/
			/* | UnicodeEscapeSequence*/
			EscapeSequence(str, index) {
				let len = this.CharacterEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				/* | 0 [lookahead ∉ DecimalDigit]*/
				x: {
					if(str[index] === '0') {
						let peek = this.DecimalDigit(str, index);
						if(peek > 0) {
							break x;
						}
						// \0 null escape found
						return 1;
					}
				}
				len = this.LegacyOctalEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.NonOctalDecimalEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.HexEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				len = this.UnicodeEscapeSequence(str, index);
				if(len > 0) {
					return len;
				}
				return 0;
			}
			CharacterEscapeSequence(str, index) {
				let len = this.SingleEscapeCharacter(str, index);
				if(len > 0) {
					return len;
				}
				len = this.NonEscapeCharacter(str, index);
				if(len > 0) {
					return len;
				}
			}
			SingleEscapeCharacter(str, index) {
				let m_arr = ["'", '"', '\\', 'b', 'f', 'n', 'r', 't', 'v'];
				let cur = str[index];
				if(m_arr.includes(cur)) {
					return 1;
				}
				return 0;
			}
			NonEscapeCharacter(str, index) {
				if(this.EscapeCharacter(str, index)) {
					return 0;
				}
				if(this.LineTerminator(str, index)) {
					return 0;
				}
				return 1;
			}
			EscapeCharacter(str, index) {
				let len0 = this.SingleEscapeCharacter(str, index);
				let len1 = this.DecimalDigit(str, index);
				let act = 0;
				if(len0 > len1) {
					act = 1;
				}
				if(str[index] === 'x') {
					return 1;
				}
				if(len0 > 0 && len0 >= len1) {
					return len0;
				}
				if(len1 > 0 && len1 > len0) {
					return len1;
				}
			}
			/*LegacyOctalEscapeSequence ::
			0 [lookahead ∈ { 8, 9 }]
			NonZeroOctalDigit [lookahead ∉ OctalDigit]
			ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
			FourToSeven OctalDigit
			ZeroToThree OctalDigit OctalDigit
			*/
			LegacyOctalEscapeSequence(str, index) {
				x: {
					if(str[index] === '0') {
						if(str[index + 1] === '8' || str[index + 1] === '9') {
							return 1;
						}
						break x;
					}
				}
				x: {
					let len = this.NonZeroOctalDigit(str, index);
					if(len > 0) {
						let n_len = this.OctalDigit(str, index + 1);
						if(n_len > 0) {
							break x;
						}
						return 1;
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if(len > 0) {
						len = this.OctalDigit(str, index + 1);
						if(len > 0) {
							let n_len = this.OctalDigit(str, index + 2);
							if(n_len > 0) {
								break x;
							}
							return 2;
						}
					}
				}
				x: {
					let len = this.FourToSeven(str, index);
					if(len > 0) {
						len = this.OctalDigit(str, index + 1);
						if(len > 0) {
							return 2;
						}
					}
				}
				x: {
					let len = this.ZeroToThree(str, index);
					if(!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 1);
					if(!len) {
						break x;
					}
					len = this.OctalDigit(str, index + 2);
					if(!len) {
						break x;
					}
					return 3;
				}

			}
			NonZeroOctalDigit(str, index) {
				if(str[index] === '0') {
					return 0;
				}
				let len = this.OctalDigit(str, index);
				if(len > 0) {
					return 1;
				}
				return 0;
			}
			ZeroToThree(str, index) {
				let cur = str[index];
				let chk = '0123';
				if(chk.includes(cur)) {
					return 1;
				}
				;
			}
			FourToSeven(str, index) {
				let cur = str[index];
				let chk = '4567';
				if(chk.includes(cur)) {
					return 1;
				}
				;
			}
			NonOctalDecimalEscapeSequence(str, index) {
				if(str[index] === '8' || str[index] === '9') {
					return 1;
				}
			}
			HexEscapeSequence(str, index) {
				if(str[index] === 'x') {
					let len = this.HexDigit(str, index);
					if(!len) {
						return 0;
					}
					len = this.HexDigit(str, index + 1);
					if(!len) {
						return 0;
					}
					return 3;
				}
			}
			UnicodeEscapeSequence(str, index) {
				let off = 0;
				if(str[index] === 'u') {
					off++;
				}
				let len0 = this.Hex4Digits(str, index + off);
				if(len0 > 0) {
					return len0 + 1;
				}
				if(str[index + off] === '{}'[0]) {
					off++;
					let len = this.CodePoint(str, index + off);
					if(len > 0) {
						off += len;
						if(str[index + off] === '{}'[1]) {
							off++;
							return off;
						}
					}
				}
				return 0;
			}
			Hex4Digits(str, index) {
				let len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len0) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				len = this.HexDigit(str, index);
				if(!len) {
					return 0;
				}
				return 4;
			}
		}
		ecma_sections.push(ecma_12_8_4);
		class ecma_12_8_6 extends ecma_base {
			/* TemplateCharacter ::*/
			/* | $ [lookahead ≠ {]*/
			/* | \ TemplateEscapeSequence*/
			/* | \ NotEscapeSequence*/
			/* | LineContinuation*/
			/* | LineTerminatorSequence*/
			/* | SourceCharacter but not one of ` or \ or $ or LineTerminator*/
			/* TemplateEscapeSequence ::*/
			/* | CharacterEscapeSequence*/
			/* | 0 [lookahead ∉ DecimalDigit]*/
			/* | HexEscapeSequence*/
			/* | UnicodeEscapeSequence*/
			/* NotEscapeSequence ::*/
			/* | 0 DecimalDigit*/
			/* | DecimalDigit but not 0*/
			/* | x [lookahead ∉ HexDigit]*/
			/* | x HexDigit [lookahead ∉ HexDigit]*/
			/* | u [lookahead ∉ HexDigit] [lookahead ≠ {]*/
			/* | u HexDigit [lookahead ∉ HexDigit]*/
			/* | u HexDigit HexDigit [lookahead ∉ HexDigit]*/
			/* | u HexDigit HexDigit HexDigit [lookahead ∉ HexDigit]*/
			/* | u { [lookahead ∉ HexDigit]*/
			/* | u { NotCodePoint [lookahead ∉ HexDigit]*/
			/* | u { CodePoint [lookahead ∉ HexDigit] [lookahead ≠ }]*/
			/* NotCodePoint ::*/
			/* | HexDigits[~Sep] but only if MV of HexDigits > 0x10FFFF*/
			/* CodePoint ::*/
			/* | HexDigits[~Sep] but only if MV of HexDigits ≤ 0x10FFFF*/
			/*Template ::*/
			/* | NoSubstitutionTemplate*/
			/* | TemplateHead*/
			Template(str, index) {
				let ret = this.NoSubstitutionTemplate(str, index);
				if(ret[1] > 0) {
					return ["Template", ret[1]];
				}
				ret = this.TemplateHead(str, index);
				if(ret[1] > 0) {
					return ["Template", ret[1]];
				}
				return [null, 0];
			}
			/* NoSubstitutionTemplate ::*/
			/* | ` TemplateCharacters opt `*/
			NoSubstitutionTemplate(str, index) {
				let offset = 0;
				if(str[index+offset] !== '`'){
					return [null, 0];
				}
				offset++
				let ret = this.TemplateCharacters();
				console.log('nst tc',ret);
				offset += ret[1];
				if(str[index+offset] !== '`'){
					return [null, 0];
				}
				return ["NoSubstitutionTemplate", offset];
			}
			/* TemplateHead ::*/
			/* | ` TemplateCharacters opt ${*/
			TemplateHead(str, index){
				let offset = 0;
				let is_result_ok = false;
				if(str[index+offset] === "`"){
					offset++;
					let ret=this.TemplateCharacters(str, index+offset);
					offset+=ret[1];
					if(str[index+offset] === '$' && str[index+offset+1] === '{}'[0]){
						offset+=2;
						is_result_ok = true;
						return ["TemplateHead", offset];
					}
				}
				return [null, 0];
			}
			/*TemplateSubstitutionTail ::*/
			/* | TemplateMiddle*/
			/* | TemplateTail*/
			TemplateSubstitutionTail(str, index){
				let offset = 0;
				let ret;
				ret=this.TemplateMiddle(str, index+offset);
				offset += ret[1];
				if(offset > 0){
					return ["TemplateSubstitutionTail", offset]
				}
				ret=this.TemplateTail(str, index+offset);
				offset+=ret[1];
				if(offset > 0){
					return ["TemplateSubstitutionTail", offset]
				}
				return [null, 0];
			}
			/*TemplateMiddle ::*/
			/* | } TemplateCharacters opt ${*/
			TemplateMiddle(str, index){
				let offset = 0;
				if(str[index+offset] === '{}'[1]){
					offset++;
					let ret=this.TemplateCharacters(str, index+offset);
					offset+=ret[1];
					if(str[index+offset] === '$' && str[index+offset+1] === '{}'[0]){
						offset+=2;
						is_result_ok = true;
						return ["TemplateMiddle", offset];
					}
				}
			}
			/* TemplateTail ::*/
			/* | } TemplateCharacters opt `*/
			TemplateTail(str, index){
				let offset = 0;
				if(str[index+offset] === '{}'[1]){
					offset++;
					let ret=this.TemplateCharacters(str, index+offset);
					offset+=ret[1];
					if(str[index+offset] === '`'){
						offset+=2;
						is_result_ok = true;
						return ["TemplateTail", offset];
					}
				}
			}
			/* TemplateCharacters ::*/
			/* | TemplateCharacter TemplateCharacters opt*/
			TemplateCharacters(str, index){
				let ret, offset = 0;
				ret=this.TemplateCharacter(str, index+offset);
				if(!ret[1]){
					return [null, 0];
				}
				offset++;
				for(let i=0;i<800;i++){
					ret=this.TemplateCharacter(str, index+offset);
					offset++;
					if(!ret[1]){
						break;
					}
				}
				return ['TemplateCharacters', offset];
			}
		}
		ecma_sections.push(ecma_12_8_6);
		class ecma_terminal extends ecma_base {
			BasicInputElement(str, index, modify_result){
				modify_result(this.WhiteSpace(str, index));
				modify_result(this.LineTerminator(str, index));
				modify_result(this.Comment(str, index));
				modify_result(this.CommonToken(str, index));
			}
			InputElementDiv(str, index) {
				let max_item = null, max_val = 0;
				function modify_result([item, val]){
					if(val > max_val) {
						max_item = item;
						max_val = val;
					}
				}
				modify_result(this.BasicInputElement(str, index, modify_result));
				modify_result(this.DivPunctuator(str, index));
				modify_result(this.RightBracePunctuator(str, index));
				return [max_item, max_val];
			}
			InputElementRegExp(str, index) {
				let max_item = null, max_val = 0;
				function modify_result([item, val]){
					if(val > max_val) {
						max_item = item;
						max_val = val;
					}
				}
				modify_result(this.BasicInputElement(str, index, modify_result));
				modify_result(this.RightBracePunctuator(str, index));
				modify_result(this.RegularExpressionLiteral(str, index));
				return [max_item, max_val];
			}
			InputElementRegExpOrTemplateTail(str, index) {
				let max_item = null, max_val = 0;
				function modify_result([item, val]){
					if(val > max_val) {
						max_item = item;
						max_val = val;
					}
				}
				modify_result(this.BasicInputElement(str, index, modify_result));
				modify_result(this.RegularExpressionLiteral(str, index));
				modify_result(this.TemplateSubstitutionTail(str, index));
				return [max_item, max_val];
			}
			InputElementTemplateTail(str, index) {
				let max_item = null, max_val = 0;
				function modify_result([item, val]){
					if(val > max_val) {
						max_item = item;
						max_val = val;
					}
				}
				modify_result(this.BasicInputElement(str, index, modify_result));
				modify_result(this.DivPunctuator(str, index));
				modify_result(this.TemplateSubstitutionTail(str, index));
				return [max_item, max_val];
			}
		}
		ecma_sections.push(ecma_terminal);
		return ecma_sections;
	}
	ecma_262_section_script_parse_factory() {
		let generated_class_vec = [];
		return generated_class_vec;
	}
	ecma_262_section_module_parse_factory() {}
	get_sequence_of_input_elements(utf8_string) {
		local_dumper.dump_value(utf8_string);
	}
	ecma_262_psudo() {
		class ParseNode {
			constructor(...e) {
				this.data_vec = e;
			}
		}
		class SyntaxError {}
		class List {
			constructor(...e) {
				if(e[0] instanceof Array && e.length == 1) {
					this.data = e[0];
				} else {
					this.data = e;
				}
			}
		}
		class ParseTree {
			root;
		}
		class ParseResult {
			/**@returns {boolean} */
			ok() {}
			/**@returns {boolean} */
			has_parse_error() {
				if(this.parse_errors.length > 0) {
					return true;
				}
				return false;
			}
			/**@returns {boolean} */
			has_early_error() {
				if(this.early_errors.length > 0) {
					return true;
				}
				return false;
			}
			/**@type {ParseTree} */
			parse_tree;
			/**@type {SyntaxError[]} */
			parse_errors;
			/**@type {SyntaxError[]} */
			early_errors;
		}
		/**@returns {ParseResult} */
		function do_parse_to_goal_symbol(sourceText, goalSymbol) {}
		function ParseText(sourceText, goalSymbol) {
			let parse_tree_root = null;
			//1.
			// Attempt to parse sourceText using goalSymbol as the goal symbol,
			//  and analyse the parse result for any early error conditions.
			// Parsing and early error detection may be interleaved in an implementation-defined manner.
			let parse_result = do_parse_to_goal_symbol(sourceText, goalSymbol);
			//2.
			// If the parse succeeded and no early errors were found,
			//  return the Parse Node (an instance of goalSymbol)
			//   at the root of the parse tree resulting from the parse.
			if(parse_result.ok() && !parse_result.has_early_error()) {
				parse_tree_root = parse_result.parse_tree.root;
				return new ParseNode(goalSymbol, parse_tree_root);
			} else {
				//3.
				// Otherwise,
				//  return
				//   a List of one or more SyntaxError objects representing the parsing errors and/or early errors.
				if(parse_result.has_parse_error()) {
					return new List(parse_result.parse_errors);
				}
				//  If more than one parsing error or early error is present,
				//   the number and ordering of error objects in the list is implementation-defined,
				//   but at least one must be present.
				if(parse_result.has_early_error()) {
					return new List(parse_result.early_errors);
				}
				throw "Invalid state";
			}
		}
		return {
			ParseText
		};
	}
	create_token_generator() {
		let token_matcher_array = this.ecma_262_factory();
		class js_root {
			static init() {
				this._init = true;
				this.export_list = [];
				for(let i of token_matcher_array)
					i._attach(js_root);
			}
			static import(name) {
				if(this._init === void 0)
					this.init();
				let item = name.split(':');
				let toc = item[0];
				let fn = item[1];
				let mat = this.export_list.find(e => e[1] === toc && e[2].includes(fn));
				let cls = mat[0];
				return cls.prototype[fn];
			}
			static export(_class, toc_loc, name_vec) {
				if(this._init === void 0)
					this.init();
				this.export_list.push([_class, toc_loc, name_vec]);
			}
			static import_all_items(trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list;
				for(let i = 0;i < arr.length;i++) {
					let cur = arr[i];
					let n_arr = cur[2];
					let src_class = cur[0];
					for(let x of n_arr) {
						if(x === 'constructor') {
							continue;
						}
						if(trg_class.prototype[x] === src_class.prototype[x]) {
							break;
						}
						trg_class.prototype[x] = src_class.prototype[x];
					}
				}
			}
			static import_all(toc_loc, trg_class) {
				if(this._init === void 0)
					this.init();
				let arr = this.export_list.filter(e => e[1] === toc_loc);
				for(let i = 0;i < arr.length;i++) {
					let cur = arr[i];
					for(let x of cur[2]) {
						if(x === 'constructor') {
							continue;
						}
						trg_class.prototype[x] = this.import(toc_loc + ':' + x);
					}
				}
			}
		}
		class js_token_generator {
			static EOF_TOKEN = Symbol();
			constructor(str) {
				this.str = null;
				this.index = 0;
			}
			describe_token(token_value) {
				let tok_str = this.str.slice(token_value[2], token_value[2] + token_value[1]);
				let token_type = token_value[0];
				if(token_type === js_token_generator.EOF_TOKEN) {
					token_type = 'EOF';
				}
				return [token_value[0], tok_str];
			}
			set_str(string) {
				this.str = string;
			}
			reset() {
				this.index = 0;
			}
			next_token() {
				let cur;
				let ret;
				if(this.str === null) {
					return [js_token_generator.EOF_TOKEN, 0, 0];
				}
				if(this.index >= this.str.length) {
					return [js_token_generator.EOF_TOKEN, 0, this.index];
				}
				cur = this.InputElementDiv(this.str, this.index);
				if(cur[0] !== null) {
					if(cur[1] === 0) {
						ret = [cur[0], cur[1], this.index];
						return ret;
					}
					ret = [cur[0], cur[1], this.index];
					this.index += cur[1];
					return ret;
				}
			}
			static add_proto() {
				js_root.import_all_items(this);
			}
		}
		js_token_generator.add_proto();
		this.token_generator = new js_token_generator();
	}
}
class WeakValueRef {
	id = -1;
	constructor(id) {
		this.id = id;
	}
}
class CSSCascade {
	render_css_variable_from_style_element(style_element, css_style_variable){
		style_sheet=style_element.sheet;
		css_rules=style_sheet.cssRules;
		css_rules_array=[...css_rules];
		matching_css_rule=css_rules_array.find(e=>e.styleMap.has(css_style_variable));
		return matching_css_rule.styleMap.get(css_style_variable);
	}
	iterate_css_rule_list_for_rule_matches(result_acc_vec, cssRules, find_needle){
		let as_arr=[...cssRules];
		for(let i=0;i<as_arr.length;i++){
			if(as_arr[i] instanceof CSSMediaRule){
				this.iterate_css_rule_list_for_rule_matches(result_acc_vec, as_arr[i].cssRules, find_needle);
				//recursive iterate
			}
			if(this.does_match_selector(as_arr[i], find_needle)){
				result_acc_vec.push(as_arr[i]);
			}
		}
	}
	does_match_selector(rule, find_needle){
		if(rule instanceof CSSKeyframesRule)
			return rule.name.includes(find_needle);
		if(rule instanceof CSSFontFaceRule)
			return false;
		if(rule instanceof CSSMediaRule){
			// this rule was already handled recursivly
			return false;
		}
		if(rule.selectorText)
			return rule.selectorText.includes(find_needle);
		// the user should figure out if they want this,
		// if not, then report an issue
		return true
	}
	search_for_matching_css_rule(element, find_needle){
		let result_vec=[];
		this.iterate_css_rule_list_for_rule_matches(result_vec, element.sheet.cssRules, find_needle);
		return result_vec;
	}
	find_matching_css_rules_in_document(target_css_selector_needle){
		{
			let doc_all=[...document.querySelectorAll("style")];
			return doc_all.flatMap(e=>{
				return this.search_for_matching_css_rule(e, target_css_selector_needle)
			});
		}
	}
	*temp(){
		yield;
		{
			let ccm=new DebugAPI.exports.CSSCascade;
			let target_arr=[...$0.classList];
			console.log(...target_arr.flatMap(e=>ccm.find_matching_css_rules_in_document(e)).map(e=>e.cssText));
		}
		yield;
	}
}
class ConnectOverPostMessage {
	constructor(state){
		this.max_elevate_id=0;
		this.event_transport_map=new WeakMap;
		this.state=state;
		this.elevated_array=[];
		this.state.is_top=this.state.window===this.state.top;
		this.state.is_root=this.state.opener===null;
		this.setup_root_proxy(this.state.window);
		if(!this.state.is_top)
			this.state.is_root=false;
		if(this.state.is_root){
			this.start_root_server();
		}else{
			if(this.state.is_top){
				this.init_transport_over(this.state.opener, this.state.window);
			}
		}
	}
	setup_root_proxy(window){
		//TODO
		let todo=true;
		if(!todo){
			return window;
		}
	}
	init_transport_over(post_message_event_transport_target, response_message_event_transport_target){
		let channel=new MessageChannel;
		this.port = channel.port2;
		post_message_event_transport_target.postMessage({
			type:"ConnectOverPostMessage",
			data:{
				type:"start",
				source:null,
				port_transfer_vec:null
			}
		}, [channel.port1]);
		this.event_transport_map.set(response_message_event_transport_target, post_message_event_transport_target);
		let message_object={
			w_connection:null,
			elevation_id:null,
			current_target:null,
			handleEvent(message_event_response){
				if(this.w_connection.deref() == null){
					console.log('lost connection in handleEvent');
					this.disconnect();
					return;
				}
				this.w_connection.deref()?.transport_init_maybe_complete({
					event:message_event_response,
					handler:this
				});
			},
			construct(connection){
				this.w_connection = new WeakRef(connection);
			},
			start(transport_target, timeout_ms){
				this.elevation_id = this.w_connection.deref()?.elevate_object(this);
				this.connect(transport_target);
				this.timeout_id = setTimeout(()=>{
					if(this.w_connection.deref() == null){
						console.log('lost connection in timeout');
					}
					this.disconnect();
					this.clear();
				}, timeout_ms);
			},
			connect(target){
				if(this.current_target !== null && this.current_target !== target)
					this.disconnect();
				this.current_target = target;
				this.current_target.addEventListener('message', this);
			},
			disconnect(){
				this.current_target.removeEventListener('message', this);
			},
			clear(){
				if(this.w_connection.deref() == null){
					console.log('lost connection in clear');
					return;
				}
				this.w_connection.deref()?.clear_elevation_by_id(this.elevation_id);
			}
		};
		message_object.construct(this);
		message_object.start(response_message_event_transport_target, 300);
	}
	clear_elevation_by_id(elevated_id){
		this.elevated_array[elevated_id] = null;
		//TODO
	}
	elevate_object(object){
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id] = new WeakRef(object);
		return elevated_id;
	}
	transport_init_maybe_complete(message_event){
		//TODO
	}
	start_root_server(){
		//TODO
	}
}
class APIProxyManager {
	constructor(event_handler){
		this.event_handler = event_handler;
	}
	create_proxy_for_function(message_to_send, function_value){
		let event_handler=this.event_handler;
		return new Proxy(function_value, {
			event_handler,
			apply(...post_message_proxy_spread){
				this.event_handler.dispatchEvent({
					type:message_to_send,
					data:post_message_proxy_spread
				});
				let ret = Reflect.apply(...post_message_proxy_spread);
				return ret;
			}
		})
	}
	start_postMessage_proxy(){
		window.postMessage = this.create_proxy_for_function('postMessage_sent', window.postMessage)
	}
}
class LoggingEventTarget {
	dispatchEvent=console.log.bind(console);
}
let dd;
function parse_html_to_binary_arr(html) {
	dd??=document.createElement("div");
	dd.innerHTML=html;
	return Array.prototype.map.call(dd.textContent, e=>e.charCodeAt(0));
}
window.parse_html_to_binary_arr=parse_html_to_binary_arr;
class DebugAPI {
	constructor(){
		let do_postMessage_logging=false;
		if(do_postMessage_logging){
			this.any_api_logger.start_postMessage_proxy();
		}
	}
	any_api_logger = new APIProxyManager(new LoggingEventTarget);
	next_remote_id = 0;
	data_store = new Map;
	event_handler = static_event_target;
	static exports = {
		CSSCascade,
		"null":null
	}
	// don't use TCP, this connection will never fail to
	// transmit, use something that does not take into
	// account failures
	static postmessage_udp = new ConnectOverPostMessage({
		window,
		top,
		parent,
		opener
	});
	static simple_parser = new RustSimpleParser;
	static javascript_parser = new SimpleJavascriptParser;
	/**@type {DebugAPI} */
	static the_instance = null;
	/**@returns {DebugAPI} */
	static the() {
		if(!this.the_instance) {
			this.the_instance = new this;
		}
		return this.the_instance;
	}
	hasData(key){
		return this.data_store.has(key);
	}
	getData(key) {
		return this.data_store.get(key);
	}
	setData(key, value) {
		this.data_store.set(key, value);
		return this;
	}
	deleteData(key) {
		return this.data_store.delete(key);
	}
	getEventListeners(element){
		if(!this.hasData('getEventListeners'))
			throw 1;
		return this.getData('getEventListeners')(element);
	}
	get_event_listener_var_vec_1(debug, undebug, func, name) {
		let __d = this.weak_root.deref();
		__d.attach(debug, undebug, null);
		function do_activate(func, f_this, c_args) {
			try {
				return Reflect.apply(func, f_this, c_args);
			} catch {}
		}
		let activate = do_activate.bind(null, func, {}, [{
			get target() {
				throw 1;
			}
		}]);
		return __d.debuggerGetVar_a(func, activate, name);
	}
	attach(debug, undebug, getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug = this.getData('d');
		let obj_undebug = this.getData('u');
		let get_ev_lis = this.getData('getEventListeners');
		if(obj_debug !== debug || obj_undebug !== undebug || get_ev_lis !== getEventListeners) {
			this.setData('d', debug);
			this.setData('u', undebug);
			this.setData('getEventListeners', getEventListeners);
		}
		return this;
	}
	activateClass(class_value, arg_vec) {
		return new class_value(...arg_vec);
	}
	activateApply(function_value, target_obj, arg_vec) {
		return Reflect.apply(function_value, target_obj, arg_vec);
	}
	debuggerBreakpointCode() {
		window.DebugAPI.the().getData("__k").get = (__v) => {
			if(__v === '__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v, eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		{
			if(!window.DebugAPI.the().clearCurrentBreakpoint()){
				console.log("failed to clear breakpoint");
			};
		}
		0;
	}
	clearCurrentBreakpoint(){
		let undebug;
		if(undebug=this.getData("u")){
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value) {
		let function_code = function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code = function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	debuggerGetVarArray_a(function_value, activate, var_match, ...activate_vec) {
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let ma = var_match.matchAll(/.-.|./g);
		let sr = [];
		let qs = [...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length === 1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs = j.split('-');
			let sa = fs[0].charCodeAt(0);
			let se = fs[1].charCodeAt(0);
			for(let i = sa;i <= se;i++) {
				sr.push(i);
			}
		}
		let vars_arr = sr.map(e => String.fromCharCode(e));
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		let __y = this.event_handler;
		this.current_function_value = function_value;
		let breakpoint_code_string = this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr = [];
		{
			rep_arr.push('__v', '__v_' + rng_bytes);
			rep_arr.push('__k', '__k_' + rng_bytes);
			rep_arr.push('__x', '__x_' + rng_bytes);
		}
		let tmp_key = '__k';
		{
			for(let i = 0;i < rep_arr.length;i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				breakpoint_code_string = breakpoint_code_string.replaceAll(cur0, cur1);
			}
		}
		let tmp_value = {};
		this.setData(tmp_key, tmp_value);
		let debug = this.getData('d');
		debug(this.current_function_value, `${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return = activate(function_value, ...activate_vec);
		let exec_res_arr = [];
		if(tmp_value.get){
			for(let j of vars_arr) {
				let res = tmp_value.get(j);
				let arg_index = -1;
				switch(res.type) {
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'eval-hidden-var':
						console.log('can\'t use dynamic eval for var hidden by eval argument "' + j + '"');
				}
			}
		}
		this.deleteData(tmp_key);
		if(exec_res_arr.length) {
			return {
				type: 'data',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: exec_return
			}
		};
	}
	debuggerGetVarArray_c(class_value, target_arg_vec, var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value, this.activateClass, var_match, target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	debuggerGetVarArray(function_value, target_obj, target_arg_vec, var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value, this.activateApply, var_match, target_obj, target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	debuggerGetVar_a(function_value, activate, var_name, ...activate_vec) {
		if(!this.hasData("d") || !this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let rng_bytes = Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value = function_value;
		let dbg_str_func = this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr = [];
		{
			rep_arr.push('__v', '__v_' + rng_bytes);
			rep_arr.push('__k', '__k_' + rng_bytes);
			rep_arr.push('__x', '__x_' + rng_bytes);
		}
		let map_arr = [dbg_str_func];
		let tmp_key = '__k';
		{
			for(let i = 0;i < rep_arr.length;i += 2) {
				let cur0 = rep_arr[i];
				let cur1 = rep_arr[i] + 1;
				if(tmp_key === cur0) {
					tmp_key = cur1;
				}
				map_arr[0] = map_arr[0].replaceAll(cur0, cur1);
			}
			dbg_str_func = map_arr[0];
		}
		let tmp_value = {};
		this.setData(tmp_key, tmp_value);
		this.getData('d')(this.current_function_value, `${dbg_str_func}`);
		// ---- Activate ----
		let activate_return = activate(function_value, ...activate_vec);
		let breakpoint_result = null;
		if(tmp_value.get){
			breakpoint_result=tmp_value.get(var_name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type === 'var') {
			return {
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			};
		}
		if(breakpoint_result){
			return {
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
		}
		return {
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		};

	}
	debuggerGetVar_c(class_value, target_arg_vec, var_name) {
		if(typeof class_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(class_value, this.activateClass, var_name, target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
	debuggerGetVar(function_value, target_obj, target_arg_vec, var_name) {
		if(typeof function_value != 'function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			let got_data = false;
			let ret = this.debuggerGetVar_a(function_value, this.activateApply, var_name, target_obj, target_arg_vec);
			if(ret.type === 'data'){
				ret = ret.data;
				got_data = true;
			}
			if(got_data && ret.result){
				if(ret.result.length>2){
					return ret.result;
				}
				if(!ret.result.length){
					return ret;
				}
				return {
					type:'debug_data',
					result:ret.result[1],
					return:ret.return
				};
			}
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
}
const debug_api_instance = DebugAPI.the();
window.DebugAPI = DebugAPI;
if(location.origin === "https://github.dev"){
	let stalled_define_calls=[];
	function define_override(...args){
		console.error('define stack');
		stalled_define_calls.push(args);
	}
	Object.defineProperty(window, 'define', {
		get(){
			return define_override;
		},
		set(v){
			console.error('define found');
			for(let i=0;i<stalled_define_calls.length;i++){
				let call_arguments=stalled_define_calls[i];
				v(...call_arguments);
			}
			Object.defineProperty(window,'define',{value:v,writable:true,configurable:true,enumerable:true})
		},
		configurable:true,
		enumerable:true,
	})
}
