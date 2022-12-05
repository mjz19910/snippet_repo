import {attach_proxy_for_setInterval} from "../block/attach_proxy_for_setInterval.js";
import {make_proxy_for_function} from "../block/make_proxy_for_function.js";
import {make_proxy_for_function_constructor} from "../block/make_proxy_for_function_constructor.js";
import {to_token_arr} from "../js/to_token_arr.js";
import js_str_2 from "./src_template_code.js";
import js_str_1 from "./src_template_decrypt_arr_str.js";

make_proxy_for_function_constructor();
make_proxy_for_function();
attach_proxy_for_setInterval();

let eq_idx=js_str_1.indexOf("=");
let var_def=js_str_1.slice(0,eq_idx);
let var_code=js_str_1.slice(eq_idx+1,js_str_1.lastIndexOf(";"));

/**
 * @param {any[]} arr
 */
function pop(arr) {
	let v=arr.pop();
	if(!v) throw new Error("stack underflow");
	return v;
}
pop;

let code_lvl=js_str_2.split(/(\{|\})/).filter(e => e!=="");
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

if(v) eval(var_def+"="+var_code+";console.log("+var_def.split(" ")[1]+");"+js_str_2);
