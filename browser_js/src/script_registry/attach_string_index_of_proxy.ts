import {attached_proxy_arr} from "./attached_proxy_arr.ts";
import {str_index_of_inject} from "./str_index_of_inject.ts";

export function attach_string_index_of_proxy() {
	String.prototype.indexOf=new Proxy(String.prototype.indexOf,{
		apply(...a) {
			str_index_of_inject();
			return Reflect.apply(...a);
		}
	});
	attached_proxy_arr.push(String.prototype.indexOf);
}
