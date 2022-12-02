import {cur_event_fns} from "./constants.js";
import {has_reg_id} from "./has_reg_id.js";
import {target_script_storage} from "./target_script_storage.js";

export function get_nearest_script() {
	if(document.currentScript!==null) {
		return document.currentScript;
	}
	while(cur_event_fns.at(-1)===void 0&&cur_event_fns.length>0) {
		cur_event_fns.pop();
	}
	let script_ghost=cur_event_fns.at(-1);
	if(!script_ghost)
		return null;
	if(has_reg_id(script_ghost) && target_script_storage.has_alive_target(script_ghost.reg_id)) {
		let reg_script=target_script_storage.get_target_item(script_ghost.reg_id);
		return reg_script;
	}
	let doc_script=document.currentScript;
	if(doc_script===null) {
		return null;
	} else {
		return doc_script;
	}
}
