import {is_in_ignored_from_src_fn, is_in_userscript, scripts_weak_arr} from "types/script_registry/mod";
import {register_obj_with_registry} from "types/script_registry/register_obj_with_registry";
import {WeakFinalInfo} from "types/script_registry/WeakFinalInfo";
import {ScriptStateHost} from "./ScriptStateHost";

export function find_all_scripts_using_string_apis(): [(WeakFinalInfo | null)[], (obj: any) => number] {
	window.is_in_ignored_fn = function() {
		return is_in_ignored_from_src_fn.flag;
	};
	ScriptStateHost.event_target.addEventListener((e: any) => {
		is_in_userscript.flag = false;
	});
	return [scripts_weak_arr, register_obj_with_registry];
}
