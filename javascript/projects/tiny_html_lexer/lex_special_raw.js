import {HTMLDataLex} from "./tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "./tiny_html_general_box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "./tiny_html_general_box/HTMLSpecialLex.js";
import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
class ErrorOr {
	/**
	 * @param {Error} err
	 */
	static from_error(err){
		return {
			/**@readonly*/
			type:'result',
			/**@readonly*/
			opt:2,
			/**@readonly*/
			value:err,
		}
	}
	/**
	 * @param {any} value
	 */
	static from_result_any(value) {
		return {
			/**@readonly*/
			type:'result',
			/**@readonly*/
			opt:1,
			uni:1,
			/**@readonly*/
			value:value,
		}
	}
	static from_result_void() {
		return {
			/**@readonly*/
			type:'result',
			/**@readonly*/
			opt:1,
			uni:2
		}
	}
}
/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex)[]} lex_arr
 * @param {string} arg1
 */
export function lex_special_raw(lex_arr, arg1) {
	lex_arr.push({
		type: "special",
		value: arg1,
	});
}
export function run_type_tests() {
	let ii=1;
	if(1)ii=2;
	if(1)ii=3;
	if(1)ii=1;
	let rr = js_type_html_lex_arr(1);
	switch(ii){
		case 1:{
			let rr = js_type_html_lex_arr(ii);
			let iv=[rr];
			lex_special_raw(iv, 'test');
			let last=iv.at(-1);
			if(!last)return ErrorOr.from_error(new Error("Verify failure"));
			if(last.type != 'special')return ErrorOr.from_error(new Error("Verify failure"));
			if(last.value != 'test')return ErrorOr.from_error(new Error("Verify failure"));
			if(iv[0] !== rr)return ErrorOr.from_error(new Error("Verify failure"));
			return ErrorOr.from_result_void();
		}
		case 2:
		case 3:
	}
	lex_special_raw
}