import {attached_proxy_arr} from "./attached_proxy_arr.ts";
import {replace_cb_with_safe_proxy} from "./replace_cb_with_safe_proxy.ts"

export function attach_promise_then_proxy() {
	Promise.prototype.then=new Proxy(Promise.prototype.then,{
		apply(...a) {
			// let target_obj = a[1]
			let call_args=a[2]
			replace_cb_with_safe_proxy(call_args,0)
			replace_cb_with_safe_proxy(call_args,1)
			return Reflect.apply(...a)
		}
	})
	attached_proxy_arr.push(Promise.prototype.then)
}
