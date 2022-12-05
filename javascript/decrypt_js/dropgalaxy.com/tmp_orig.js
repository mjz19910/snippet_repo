import {attach_proxy_for_setInterval} from "../block/attach_proxy_for_setInterval.js";
import {make_proxy_for_function} from "../block/make_proxy_for_function.js";
import {make_proxy_for_function_constructor} from "../block/make_proxy_for_function_constructor.js";
import {is_term} from "./is_term.js";
import {use_encrypt_code} from "./use_encrypt_code.js";

make_proxy_for_function_constructor();
make_proxy_for_function();
attach_proxy_for_setInterval();

/**
 * @param {number | undefined} start_index
 * @param {string[]} arr
 */
export function x(arr,start_index) {
	let index=arr.indexOf("{",start_index);
	index=arr.indexOf("}",index);
	if(is_term(arr[index+1])) {index++;}
	console.log(arr.slice(start_index,index+1).join(""));
	return index+1;
}

use_encrypt_code();