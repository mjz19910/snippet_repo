import {is_in_ignored_from_src_fn, is_in_userscript} from "./find_all_scripts_using_string_apis";
import {has_reg_id} from "./has_reg_id";
import {cur_event_fns, is_in_userscript_fn} from "./mod";

export function get_nearest_script() {
	if(document.currentScript !== null) {
		return document.currentScript;
	}
	let cur_script;
	while(cur_event_fns.at(-1) === void 0 && cur_event_fns.length > 0) {
		cur_event_fns.pop();
	}
	let script_ghost = cur_event_fns.at(-1);
	if(!script_ghost)
		return null;
	if(has_reg_id(script_ghost))
		
	if(cur_script === void 0 && !is_in_userscript.flag && !is_in_userscript_fn.flag && !is_in_ignored_from_src_fn.flag) {
		debugger;
	}
	script_ghost = cur_event_fns.at(-1);
	if(script_ghost)
		if(has_reg_id(script_ghost)){}
	let doc_script = document.currentScript;
	if(doc_script === null) {
		return null;
	} else {
		return doc_script;
	}
}
