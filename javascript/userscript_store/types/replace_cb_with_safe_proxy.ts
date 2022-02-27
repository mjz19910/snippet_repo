import {is_in_userscript_fn, cur_event_fns} from "../typed_mod_rebuild_auto";
import {register_obj_with_registry} from "./register_obj_with_registry";
import {is_in_userscript, is_in_ignored_from_src_fn} from "./find_all_scripts_using_string_apis";

export function replace_cb_with_safe_proxy(args: any[], index: number) {
	let value = args[index];
	if(index && args && value instanceof Function) {
		if(is_in_userscript) {
			value.is_userscript_fn = true;
		}
		if(is_in_userscript_fn) {
			value.is_userscript_fn = true;
		}
		if(document.currentScript) {
			value.reg_id = register_obj_with_registry(document.currentScript);
		}
		args[index] = new Proxy(value, {
			apply(...a) {
				let ret;
				let should_reset = false;
				cur_event_fns.push(a[0]);
				let idx = cur_event_fns.indexOf(a[0]);
				if(a[0].is_userscript_fn) {
					is_in_ignored_from_src_fn.flag = true;
					if(is_in_userscript_fn.flag === false) {
						is_in_userscript_fn.flag = true;
						should_reset = true;
					}
				}
				try {
					ret = Reflect.apply(...a);
				} finally {
					if(should_reset) {
						is_in_userscript_fn.flag = false;
						should_reset = false;
					}
					is_in_ignored_from_src_fn.flag = false;
					delete cur_event_fns[idx];
				}
				delete cur_event_fns[idx];
				return ret;
			}
		});
		args = [];
		index = -1;
	}
	value = null;
}
