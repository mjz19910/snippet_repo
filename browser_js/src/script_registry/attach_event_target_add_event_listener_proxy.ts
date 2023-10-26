import {attached_proxy_arr} from "./attached_proxy_arr.ts";
import {replace_cb_with_safe_proxy} from "./replace_cb_with_safe_proxy.ts";

export function attach_event_target_add_event_listener_proxy() {
	EventTarget.prototype.addEventListener=new Proxy(EventTarget.prototype.addEventListener,{
		apply(...a): any {
			let target_obj=a[1];
			let call_args=a[2];
			replace_cb_with_safe_proxy(call_args,1);
			debugger;
			console.log(target_obj,call_args);
			let ret=Reflect.apply(...a);
			return ret;
		}
	});
	attached_proxy_arr.push(EventTarget.prototype.addEventListener);
}
