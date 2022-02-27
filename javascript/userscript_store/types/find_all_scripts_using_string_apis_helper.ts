import {ScriptStateHost} from "./ScriptStateHost";
import {WeakFinalInfo} from "./WeakFinalInfo";
import {register_obj_with_registry} from "./register_obj_with_registry";
import {is_in_ignored_from_src_fn, is_in_userscript, scripts_weak_arr} from "./find_all_scripts_using_string_apis";


export function find_all_scripts_using_string_apis(): [(WeakFinalInfo | null)[], (obj: any) => number] {
	window.is_in_ignored_fn = function() {
		return is_in_ignored_from_src_fn;
	};
	ScriptStateHost.event_target.addEventListener((e: any) => {
		is_in_userscript.flag = false;
	});
	return [scripts_weak_arr, register_obj_with_registry];
}
