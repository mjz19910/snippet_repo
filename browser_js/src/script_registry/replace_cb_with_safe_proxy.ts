import {add_own_property} from "./add_own_property";
import {cur_event_fns} from "./cur_event_fns.js";
import {register_obj_with_registry} from "./register_obj_with_registry.js";

export function replace_cb_with_safe_proxy(args: any[],index: number) {
	let value=args[index];
	if(index&&args&&value instanceof Function) {
		let val_fn: Function=value;
		if(document.currentScript&&add_own_property(val_fn,"reg_id")&&'reg_id' in val_fn) {
			val_fn.reg_id=register_obj_with_registry(document.currentScript);
		}
		args[index]=new Proxy(value,{
			apply(...a) {
				let ret;
				cur_event_fns.push(a[0]);
				let idx=cur_event_fns.indexOf(a[0]);
				try {
					ret=Reflect.apply(...a);
				} finally {
					delete cur_event_fns[idx];
				}
				return ret;
			}
		});
		args=[];
		index=-1;
	}
	value=null;
}
