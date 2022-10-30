import {replace_cb_with_safe_proxy} from "./replace_cb_with_safe_proxy"
import {is_in_userscript,attached_proxy_arr} from "./mod"

export function attach_event_target_add_event_listener_proxy() {
	EventTarget.prototype.addEventListener=new Proxy(EventTarget.prototype.addEventListener,{
		apply(...a): any {
			// this will always be EventTarget.prototype.addEventListener (the real one)
			// let target_fn=a[0]
			let target_obj=a[1]
			let call_args=a[2]
			replace_cb_with_safe_proxy(call_args,1)
			// ignore any calls from this script
			if(!is_in_userscript.flag) {
				debugger
				console.log(target_obj,call_args)
			}
			let ret=Reflect.apply(...a)
			return ret
		}
	})
	attached_proxy_arr.push(EventTarget.prototype.addEventListener)
}
