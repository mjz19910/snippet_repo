import {to_token_arr} from "../js/to_token_arr.js";
import {decrypt_code_src} from "./src_template_code.js";

let real_constructor=Function.prototype.constructor;
/** @arg {string} [fn_string] */
Function.prototype.constructor=function(fn_string) {
	if(fn_string==="debugger") {
		return function() {};
	} else {
		console.log("no make proto.fn",JSON.stringify(fn_string));
	}
	return real_constructor.call(this,fn_string);
};
Function.prototype.constructor.prototype=Function.prototype;
let log_fn=console.log.bind(console);
/** @template T @arg {any} v @returns {T} */
function any(v) {
	return v;
}
/** @type {import("../../../typescript/modules/DebugAPI_raw/support/GlobalThisExt.js").GlobalThisExt} */
let global_save=any(globalThis);
global_save.log_fn=log_fn;

let skip_log=false;
let messages=[];
function make_proxy_for_function() {
	Function.prototype.bind=new Proxy(Function.prototype.bind,{
		apply(target,thisValue,parameters) {
			if(!skip_log) {
				messages.push(["Function bind",new Error(),target,thisValue,...parameters]);
			}
			return Reflect.apply(target,thisValue,parameters);
		}
	});
}

make_proxy_for_function();
let original_setInterval=globalThis.setInterval;
original_setInterval;
globalThis.setInterval=new Proxy(globalThis.setInterval,{
	/** @arg {[ typeof setInterval, any, [ TimerHandler, number | undefined ] ]} arg0 */
	apply(...[,,[func,ms]]) {
		console.log("set_interval ms",ms);
		return setTimeout(function() {
			log_fn("timeout");
			setTimeout(func,0);
			setTimeout(() => {
				setTimeout(() => {},0);
			},0);
		},0);
	}
});
import code_arr_str from "./src_template_decrypt_arr_str.js";
let _0x4a8e_=code_arr_str;

let eq_idx=_0x4a8e_.indexOf("=");

let var_def=_0x4a8e_.slice(0,eq_idx);
let var_code=_0x4a8e_.slice(eq_idx+1,_0x4a8e_.lastIndexOf(";"));

let decrypt_code=decrypt_code_src;

decrypt_code=decrypt_code.replaceAll("\n","");

/**
 * @param {any[]} arr
 */
function pop(arr) {
	let v=arr.pop();
	if(!v) throw new Error("stack underflow");
	return v;
}
pop;

let code_lvl=decrypt_code.trim().split(/(\{|\})/).filter(e => e!=="");
let level_data=to_token_arr(code_lvl);
let index=0;
for(let i=0;i<6;i++) {
	index=x(index);
}

/**
 * @param {string} x
 */
function is_term(x) {
	return x===';'||x===',';
}
/**
 * @param {number | undefined} start_index
 */
function x(start_index) {
	let index=level_data.indexOf("{",start_index);
	index=level_data.indexOf("}",index);
	if(is_term(level_data[index+1])) {index++;}
	console.log(level_data.slice(start_index,index+1).join(""));
	return index+1;
}

let v=false;

if(v) eval(var_def+"="+var_code+";console.log("+var_def.split(" ")[1]+");"+decrypt_code);


