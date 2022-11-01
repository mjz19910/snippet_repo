// ==UserScript==
// @name         global DebugAPI userscript
// @namespace    http://tampermonkey.net/
// @version      0.3.2
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

/**@type {typeof window.g_api} */
let g_api={};
window.g_api=g_api;
class Repeat {
	/**@type {Map<string, Map<number, Repeat>>} */
	static map=new Map;
	/**
	 * @param {string} value
	 * @param {number} times
	 * @returns {Repeat}
	 */
	static get(value,times) {
		if(!this.map.has(value)) {
			this.map.set(value,new Map);
		}
		let tm_map=this.map.get(value);
		if(!tm_map) throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep =tm_map.get(times);
			if(!rep) throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**
	 * @param {any} value
	 * @param {any} times
	 */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}
g_api.Repeat=Repeat;
class CompressRepeated {
	/** @param {string | any[]} src @param {(string|Repeat)[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @param {(string | Repeat)[]} src @param {string | any[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @param {string[]} src @param {(string|Repeat)[]} dst @returns {[boolean, (string|Repeat)[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @param {(string | Repeat)[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
	/**
	 * @param {string | any[]} arr
	 */
	static can_compress_items(arr) {
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(typeof item!=='string') return false;
			if(item.match(/[a-zA-Z]/)===null) return false;
		}
		return true;
	}
	/** @param {string[]} arr */
	try_compress(arr) {
		/**@type {(string|Repeat)[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length&&item===arr[i+1]) {
				let off=0;
				while(item===arr[i+off+1]) off++;
				if(off>0) {
					let rep_count=off+1;
					ret.push(Repeat.get(item,rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/** @param {(string | Repeat)[]} arr */
	try_decompress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item) continue;
			if(item instanceof Repeat) {
				let {value,times}=item;
				for(let j=0;j<times;j++)ret.push(value);
				continue;
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	/** @param {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		{
			let [success,res]=this.try_compress(arr);
			this.try_decompress(res);
			if(success) return res;
		}
		return arr;
	}
}
g_api.CompressRepeated=CompressRepeated;
/**@type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys,values) {
	/**@type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		/**@type {[typeof k, typeof v]} */
		let item=[k,v];
		ret.push(item);
	}
	return ret;
}
g_api.to_tuple_arr=to_tuple_arr;
/**
 * @param {string | any[]} arr
 * @param {number} idx
 * @param {string | any[]} range
 */
function range_matches(arr,idx,range) {
	for(let i=0;i<range.length;i++) {
		if(arr[idx+i]!==range[i]) return false;
	}
	return true;
}
g_api.range_matches=range_matches;
class CompressionStatsCalculator {
	constructor() {
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
	/**
	 * @param {string} key
	 * @param {any[]} real
	 */
	add_item(key,real) {
		let index=this.cache.indexOf(key);
		if(index==-1) {
			this.real.push(real);
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset() {
		this.cache.length=0;
		this.hit_counts.length=0;
		this.real.length=0;
	}
	/** @param {any[]} arr @param {number} win_size */
	calc_compression_stats(arr,win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				let arr_slice=arr.slice(i,i+win_size);
				this.add_item(arr_slice.join(","),arr_slice);
			}
		}
		return to_tuple_arr(to_tuple_arr(this.cache,this.real),this.hit_counts);
	}
	/**
	 * @param {string | any[]} arr
	 * @param {string | any[]} range
	 * @param {any} range_replacement
	 */
	replace_range(arr,range,range_replacement) {
		if(range.length<=0) return arr;
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			if(range_matches(arr,i,range)) {
				i+=range.length-1;
				ret.push(range_replacement);
				continue;
			}
			ret.push(arr[i]);
		}
		return ret;
	}
}
g_api.CompressionStatsCalculator=CompressionStatsCalculator;
class HexRandomDataGenerator {
	constructor() {
		this.random_num=Math.random();
		this.used_bits=0;
		/**@type {{value:number,bit_count:number}|null} */
		this.cur_part={
			value:0,
			bit_count:0,
		};
	}
	reset() {
		this.random_num=Math.random();
		this.used_bits=0;
	}
	/**
	 * @param {number} bit_count
	 */
	next(bit_count) {
		let random_size=1<<bit_count;
		let num=~~(this.random_num*random_size);
		this.used_bits+=bit_count;
		this.random_num*=random_size;
		this.random_num-=num;
		return num;
	}
	reset_part() {
		this.cur_part=null;
	}
	/**
	 * @param {number} bit_count
	 */
	next_part(bit_count) {
		let cur_num=this.next(bit_count);
		if(this.used_bits>=48) {
			console.log('before_rng_reset',this.random_num);
			this.reset();
		}
		if(this.cur_part) {
			cur_num+=this.cur_part.value*bit_count;
			bit_count+=this.cur_part.bit_count;
			this.cur_part={
				value: cur_num,
				bit_count,
			};
		} else {
			this.cur_part={
				value: cur_num,
				bit_count: bit_count
			};
		}
	}
	complete() {
		if(!this.cur_part) throw new Error("unable to complete");
		return this.cur_part.value;
	}
	next_byte() {
		let size=1<<8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num=this.complete();
		return (size+num).toString(16).slice(1);
	}
}
g_api.HexRandomDataGenerator=HexRandomDataGenerator;
let random_data_generator=new HexRandomDataGenerator;
class EventListenerValue {
	/**
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback,options) {
		/**@type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/**@type {boolean | EventListenerOptions} */
		this.options=options;
	}
}
g_api.EventListenerValue=EventListenerValue;
class GenericEvent {
	#default_prevented=false;
	type='unknown';
	/**@param {string} type */
	constructor(type) {
		if(type) {
			this.type=type;
		}
	}
	preventDefault() {
		this.#default_prevented=true;
	}
	get defaultPrevented() {
		return this.#default_prevented;
	}
}
g_api.GenericEvent=GenericEvent;
class GenericDataEvent extends GenericEvent {
	/**
	 * @param {string} type
	 * @param {any} data
	 */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
g_api.GenericDataEvent=GenericDataEvent;
class GenericEventTarget {
	constructor() {
		/**@type {Map<string,EventListenerValue[]>} */
		this._events=new Map;
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject | null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	addEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec) {
			cur_event_vec=[];
			this._events.set(type,cur_event_vec);
		}
		cur_event_vec.push(new EventListenerValue(callback,options));
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	removeEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec)
			return;
		if(cur_event_vec.length==0)
			return;
		for(let i=cur_event_vec.length-1;i>=0;i--) {
			let cur=cur_event_vec[i];
			if(cur.callback!==callback)
				continue;
			if(cur.options!==options)
				continue;
			cur.callback=null;
			cur_event_vec.splice(i,1);
		}
	}
	/**
	 * @param {Event} event
	 * @returns {boolean}
	 */
	dispatchEvent(event) {
		let event_type=event.type;
		let cur_event_vec=this._events.get(event_type);
		if(!cur_event_vec)
			return false;
		let cur_event_vec_owned=cur_event_vec.slice();
		let can_handle=false;
		for(let i=0;i<cur_event_vec_owned.length;i++) {
			let cur=cur_event_vec_owned[i];
			let callback=cur.callback;
			if(callback===null)
				continue;
			if(typeof callback==='function') {
				callback(event);
				can_handle=true;
				continue;
			}
			if(callback.handleEvent&&typeof callback.handleEvent==='function') {
				callback.handleEvent(event);
				can_handle=true;
			}
		}
		return can_handle;
	}
}
g_api.GenericEventTarget=GenericEventTarget;
const static_event_target=new GenericEventTarget;
class Dumper {
	/**@type {null} */
	m_dump_value=null;
	/**@arg {null} value */
	dump_value(value) {
		this.m_dump_value=value;
		this.m_dump_value=null;
	}
}
g_api.Dumper=Dumper;
const local_dumper=new Dumper;
class RustSimpleTokenizer {
	constructor() {
		this.index=0;
		this.source=null;
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
	/**
	 * @param {any} char_code
	 */
	is_separator(char_code) {

	}
	/**
	 * @param {any} str
	 */
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
				if(!cur_tt_vec) throw new Error("token stack underflow");
				cur_tt_vec.push(tt_item);
				cur_tt_vec.push(x);
				{
					let tt_item=tt_stack.pop();
					if(!tt_item) throw new Error("token stack underflow");
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
g_api.RustSimpleTokenizer=RustSimpleTokenizer;
class RustTokenTreeParser {
	tokenizer=new RustSimpleTokenizer;
	/**
	 * @param {string} str
	 */
	simple_type_info(str) {
		// let iter_index = 0
		this.tokenizer.reset(str);
		let token_vec=this.tokenizer.str_to_tokens(str);
		let tt_root=this.tokenizer.into_tt(token_vec);
		let trg_obj={
			body: tt_root[0]
		};
		return trg_obj;
	}
	result_ok_option_any_example() {
		let simple_type_info_str="{value:Result<_, ()>={discriminant:Result::discriminant=Result::Ok,value:Option<any>={discriminant:Option::discriminant=Option::Some,value=root.value}}}";
		let ret=this.simple_type_info(simple_type_info_str);
		return ret;
	}
}
g_api.RustSimpleParser=RustTokenTreeParser;
class WeakValueRef {
    id = -1;
	/**@arg {number} id */
    constructor(id) {
        this.id = id;
    }
}
g_api.WeakValueRef=WeakValueRef;
class CSSCascade {
	/**
	 * @param {{ sheet: any; }} style_element
	 * @param {any} css_style_variable
	 */
	render_css_variable_from_style_element(style_element,css_style_variable) {
		let style_sheet=style_element.sheet;
		let css_rules=style_sheet.cssRules;
		let css_rules_array=[...css_rules];
		let matching_css_rule=css_rules_array.find((/** @type {{ styleMap: { has: (arg0: any) => any; }; }} */ e) => e.styleMap.has(css_style_variable));
		return matching_css_rule.styleMap.get(css_style_variable);
	}
	/**
	 * @param {any[]} result_acc_vec
	 * @param {any} cssRules
	 * @param {any} find_needle
	 */
	iterate_css_rule_list_for_rule_matches(result_acc_vec,cssRules,find_needle) {
		let as_arr=[...cssRules];
		for(let i=0;i<as_arr.length;i++) {
			if(as_arr[i] instanceof CSSMediaRule) {
				this.iterate_css_rule_list_for_rule_matches(result_acc_vec,as_arr[i].cssRules,find_needle);
				//recursive iterate
			}
			if(this.does_match_selector(as_arr[i],find_needle)) {
				result_acc_vec.push(as_arr[i]);
			}
		}
	}
	/**
	 * @param {{ name: string | any[]; selectorText: string | any[]; }} rule
	 * @param {string} find_needle
	 */
	does_match_selector(rule,find_needle) {
		if(rule instanceof CSSKeyframesRule)
			return rule.name.includes(find_needle);
		if(rule instanceof CSSFontFaceRule)
			return false;
		if(rule instanceof CSSMediaRule) {
			// this rule was already handled recursively
			return false;
		}
		if(rule.selectorText)
			return rule.selectorText.includes(find_needle);
		// the user should figure out if they want this,
		// if not, then report an issue
		return true;
	}
	/**
	 * @param {HTMLStyleElement} element
	 * @param {any} find_needle
	 */
	search_for_matching_css_rule(element,find_needle) {
		/**
		 * @type {never[]}
		 */
		let result_vec=[];
		if(!element.sheet) throw new Error("style element without sheet");
		this.iterate_css_rule_list_for_rule_matches(result_vec,element.sheet.cssRules,find_needle);
		return result_vec;
	}
	/**
	 * @param {any} target_css_selector_needle
	 */
	find_matching_css_rules_in_document(target_css_selector_needle) {
		{
			/**@type {HTMLStyleElement[]} */
			let doc_all=[];
			let doc_query=document.querySelectorAll("style");
			for(let i=0;i<doc_query.length;i++) {
				doc_all.push(doc_query[i]);
			}
			return doc_all.flatMap(e => {
				return this.search_for_matching_css_rule(e,target_css_selector_needle);
			});
		}
	}
	*temp() {
		yield;
	}
}
g_api.CSSCascade=CSSCascade;
class TransportMessageObj {
	/**@type {WeakRef<RemoteOriginConnection>|null} */
	w_connection=null;
	/**@type {number|null|undefined} */
	elevation_id=null;
	/** @type {Window|null} */
	current_target=null;
	/**
	 * @param {any} message_event_response
	 */
	handleEvent(message_event_response) {
		if(this.w_connection&&this.w_connection.deref()==null) {
			console.log('lost connection in handleEvent');
			this.disconnect();
			return;
		}
		this.w_connection&&this.w_connection.deref()?.transport_init_maybe_complete({
			event: message_event_response,
			handler: this
		});
	}
	/**
	 * @param {RemoteOriginConnection} connection
	 */
	construct(connection) {
		this.w_connection=new WeakRef(connection);
	}
	/** @type {ReturnType<typeof setTimeout>|null} */
	timeout_id=null;
	/**
	 * @param {Window} transport_target
	 * @param {number} timeout_ms
	 */
	start(transport_target,timeout_ms) {
		if(!this.w_connection) throw new Error();
		this.elevation_id=this.w_connection.deref()?.elevate_object(this);
		this.connect(transport_target);
		this.timeout_id=setTimeout(() => {
			if(!this.w_connection) throw new Error();
			if(this.w_connection.deref()==null) {
				console.log('lost connection in timeout');
			}
			this.disconnect();
			this.clear();
		},timeout_ms);
	}
	/**
	 * @param {Window} target
	 */
	connect(target) {
		if(this.current_target!==null&&this.current_target!==target)
			this.disconnect();
		this.current_target=target;
		this.current_target.addEventListener('message',this);
	}
	disconnect() {
		if(this.current_target) {
			this.current_target.removeEventListener('message',this);
		}
	}
	clear() {
		if(!this.w_connection) throw new Error();
		if(this.w_connection.deref()==null) {
			console.log('lost connection in clear');
			return;
		}
		if(this.elevation_id === null)throw new Error();
		if(this.elevation_id === void 0)throw new Error();
		this.w_connection.deref()?.clear_elevation_by_id(this.elevation_id);
	}
}
class OriginState {
	/**@readonly*/static window=window;
	/**@readonly*/static top=window.top;
	/**@readonly*/static parent=window.parent;
	/**
	 * @type {Window|null}
	 * @readonly
	 * */
	static opener=window.opener;
	/**
	 * @type {boolean}
	 */
	static is_top;
	/**
	 * @type {boolean}
	 */
	static is_root;
}
g_api.OriginState=OriginState;
class RemoteOriginConnection {
	// @Update on minor version change
	// version 0.3.0 sha1 initial commit
	sha_1_initial="f615a9c";
	constructor() {
		this.max_elevate_id=0;
		/**@type {WeakMap<Window, Window>} */
		this.event_transport_map=new WeakMap;
		this.state=OriginState;
		/**
		 * @type {(WeakRef<any>|null)[]}
		 */
		this.elevated_array=[];
		this.state.is_top=this.state.window===this.state.top;
		this.state.is_root=this.state.opener===null;
		this.setup_root_proxy(this.state.window);
		if(!this.state.is_top)
			this.state.is_root=false;
		if(this.state.opener===null) {
			this.start_root_server();
		} else {
			if(this.state.is_top) {
				this.init_transport_over(this.state.opener,this.state.window);
			}
		}
	}
	/**
	 * @param {Window & typeof globalThis} window
	 */
	setup_root_proxy(window) {
		//TODO
		let todo=true;
		if(!todo) {
			return window;
		}
	}
	/**
	 * @param {Window} post_message_event_transport_target
	 * @param {Window} response_message_event_transport_target
	 */
	init_transport_over(post_message_event_transport_target,response_message_event_transport_target) {
		let channel=new MessageChannel;
		this.port=channel.port2;
		post_message_event_transport_target.postMessage({
			type: "ConnectOverPostMessage",
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		this.event_transport_map.set(response_message_event_transport_target,post_message_event_transport_target);
		let message_object=new TransportMessageObj;
		message_object.construct(this);
		message_object.start(response_message_event_transport_target,300);
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id) {
		this.elevated_array[elevated_id]=null;
		//TODO
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=new WeakRef(object);
		return elevated_id;
	}
	/**
	 * @param {any} message_event
	 */
	transport_init_maybe_complete(message_event) {
		//TODO
	}
	start_root_server() {
		//TODO
	}
}
g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
class APIProxyManager {
	/**
	 * @param {LoggingEventTarget} event_handler
	 */
	constructor(event_handler) {
		this.event_handler=event_handler;
	}
	/**
	 * @param {string} message_to_send
	 * @param {()=>void} function_value
	 */
	create_proxy_for_function(message_to_send,function_value) {
		let event_handler=this.event_handler;
		let obj={
			event_handler,
			/**@arg {[target: () => void, thisArg: any, argArray: any[]]} post_message_proxy_spread */
			apply(...post_message_proxy_spread) {
				this.event_handler.dispatchEvent({
					type: message_to_send,
					data: post_message_proxy_spread
				});
				let ret=Reflect.apply(...post_message_proxy_spread);
				return ret;
			}
		};
		return new Proxy(function_value,obj);
	}
	start_postMessage_proxy() {
		/**@type {any} */
		let win_post_message = window.postMessage;
		window.postMessage=this.create_proxy_for_function('postMessage_sent',win_post_message);
	}
}
g_api.APIProxyManager=APIProxyManager;
class LoggingEventTarget {
	dispatchEvent=console.log.bind(console);
}
g_api.LoggingEventTarget=LoggingEventTarget;
const html_parsing_div_element=document.createElement("div");
/**
 * @param {string} html
 */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML=html;
	return Array.prototype.map.call(html_parsing_div_element.textContent,e => e.charCodeAt(0));
}
window.parse_html_to_binary_arr=parse_html_to_binary_arr;
class DebugAPI {
	constructor() {
		let do_postMessage_logging=false;
		if(do_postMessage_logging) {
			this.any_api_logger.start_postMessage_proxy();
		}
	}
	any_api_logger=new APIProxyManager(new LoggingEventTarget);
	next_remote_id=0;
	data_store=new Map;
	event_handler=static_event_target;
	static udp_like_remote_origin_connection=new RemoteOriginConnection();
	static token_tree_parser=new RustTokenTreeParser;
	/**@type {DebugAPI|null} */
	static m_the=null;
	/**@returns {DebugAPI} */
	static the() {
		if(!this.m_the) {
			this.m_the=new this;
		}
		return this.m_the;
	}
	/** @arg {string} key */
	hasData(key) {
		return this.data_store.has(key);
	}
	/** @arg {string} key */
	getData(key) {
		return this.data_store.get(key);
	}
	/** @arg {string} key @arg {any} value */
	setData(key,value) {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/**
	 * @param {any} element
	 */
	getEventListeners(element) {
		if(!this.hasData('getEventListeners'))
			throw 1;
		return this.getData('getEventListeners')(element);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {(this: any, ...args: readonly any[]) => any} func
	 * @param {any} name
	 */
	get_event_listener_var_vec_1(debug,undebug,func,name) {
		this.attach(debug,undebug,null);
		/**
		 * @param {(this: any, ...args: readonly any[]) => any} func
		 * @param {any} f_this
		 * @param {readonly any[]} c_args
		 */
		function do_activate(func,f_this,c_args) {
			try {
				return Reflect.apply(func,f_this,c_args);
			} catch {}
		}
		let activate=do_activate.bind(null,func,{},[{
			get target() {
				throw 1;
			}
		}]);
		return this.debuggerGetVar_a(func,activate,name, []);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {null} getEventListeners
	 */
	attach(debug,undebug,getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getData('d');
		let obj_undebug=this.getData('u');
		let get_ev_lis=this.getData('getEventListeners');
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData('d',debug);
			this.setData('u',undebug);
			this.setData('getEventListeners',getEventListeners);
		}
		return this;
	}
	/**
	 * @param {new (...arg0: any[]) => any} class_value
	 * @param {any[]} arg_vec
	 */
	activateClass(class_value,arg_vec) {
		return new class_value(...arg_vec);
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} arg_vec
	 */
	activateApply(function_value,target_obj,arg_vec) {
		return Reflect.apply(function_value,target_obj,arg_vec);
	}
	debuggerBreakpointCode() {
		the_debug_api().getData("__k").get=(/** @type {string} */ __v) => {
			if(__v==='__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v,eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		{
			if(!the_debug_api().clearCurrentBreakpoint()) {
				console.log("failed to clear breakpoint");
			}
		}
		0;
	}
	clearCurrentBreakpoint() {
		let undebug;
		if(undebug=this.getData("u")) {
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
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**
	 * @param {any} function_value
	 * @param {any} activate
	 * @param {string} var_match
	 * @arg {any} target_obj
	 * @param {any[]} target_activate_args
	 */
	debuggerGetVarArray_a(function_value,activate,var_match,target_obj,target_activate_args) {
		let activate_vec = [target_obj, target_activate_args]
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let ma=var_match.matchAll(/.-.|./g);
		let sr=[];
		let qs=[...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs=j.split('-');
			let sa=fs[0].charCodeAt(0);
			let se=fs[1].charCodeAt(0);
			for(let i=sa;i<=se;i++) {
				sr.push(i);
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e));
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				breakpoint_code_string=breakpoint_code_string.replaceAll(cur0,cur1);
			}
		}
		/**@type {{get?:(val:string)=>any}} */
		let tmp_value={};
		this.setData(tmp_key,tmp_value);
		let debug=this.getData('d');
		debug(this.current_function_value,`${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return=activate(function_value,activate_vec);
		let exec_res_arr=[];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res=tmp_value.get(j);
				switch(res.type) {
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'eval-hidden-var':
						console.log('can\'t use dynamic eval for var hidden by eval argument "'+j+'"');
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
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray_c(class_value,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value,this.activateClass,var_match,target_arg_vec[0], target_arg_vec.slice(1));
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 */
	debuggerGetVarArray(function_value,target_obj,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value,this.activateApply,var_match,target_obj,target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {(this: any, ...args: readonly any[]) => any} function_value
	 * @param {any} activate
	 * @param {any} var_name
	 * @param {any[]} activate_vec
	 */
	debuggerGetVar_a(function_value,activate,var_name,activate_vec) {
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				/**@type {"invalid-state-error"} */
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value!='function') {
			return {
				/**@type {"argument-error"} */
				type: 'argument-error',
				data: null
			};
		}
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let map_arr=[dbg_str_func];
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				map_arr[0]=map_arr[0].replaceAll(cur0,cur1);
			}
			dbg_str_func=map_arr[0];
		}
		class DebugInfoValue {
			valid=false;
			/**@arg {string} __v @returns {{type: 'hidden-var',var: string}|{type: 'var',data: [string,any]}|{type: 'no-var', data: null}|null} */
			get(__v) {
				return null
			}
		}
		let tmp_value=new DebugInfoValue;
		this.setData(tmp_key,tmp_value);
		this.getData('d')(this.current_function_value,`${dbg_str_func}`);
		// ---- Activate ----
		let activate_return=activate(function_value,activate_vec);
		let breakpoint_result=null;
		if(tmp_value.get) {
			breakpoint_result=tmp_value.get(var_name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type==='var') {
			return {
				/**@type {"data"} */
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			};
		}
		if(breakpoint_result) {
			return {
				/**@type {"unexpected"} */
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
		}
		return {
			/**@type {"no-response"} */
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		};

	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar_c(class_value,target_arg_vec,var_name) {
		if(typeof class_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVar_a(class_value,this.activateClass,var_name,target_arg_vec);
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar(function_value,target_obj,target_arg_vec,var_name) {
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			let ret=this.debuggerGetVar_a(function_value,this.activateApply,var_name,[target_obj,target_arg_vec]);
			if(ret.type!=='data') throw new Error("Debug fail");
			if(ret.data===null) throw new Error("Debug fail");
			if(ret.data.result===null) throw new Error("Debug fail");
			if(ret.data.result.length>2) return ret.data.result;
			if(!ret.data.result.length) return ret;
			return {
				type: 'debug_data',
				result: ret.data.result[1],
				return: ret.data.return
			};
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
}
/**@type {<T,U extends {the(): DebugAPI}>(v:T|U)=>v is U} */
function is_debug_api(_v) {
	return true;
}
function the_debug_api() {
	if(is_debug_api(window.DebugAPI)) {
		return window.DebugAPI.the();
	}
	throw new Error("No debug api");
}
window.DebugAPI??=DebugAPI;
const debug_api=DebugAPI.the();
