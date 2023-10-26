import {attached_proxy_arr} from "./attached_proxy_arr.ts";
import {replace_cb_with_safe_proxy} from "./replace_cb_with_safe_proxy.ts"

export function attach_request_animation_frame_proxy() {
	window.requestAnimationFrame=new Proxy(window.requestAnimationFrame,{
		apply(...a) {
			// let target_obj = a[1]
			let call_args=a[2]
			replace_cb_with_safe_proxy(call_args,0)
			return Reflect.apply(...a)
		}
	})
	attached_proxy_arr.push(window.requestAnimationFrame)
}
