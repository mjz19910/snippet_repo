import {CleanupType} from "./CleanupType.js";
import {weak_scripts_arr} from "./weak_scripts_arr.js";

export function script_reg_cleanup_callback(held: CleanupType) {
	let arr_key=held.arr_key;
	let weak_state_index=weak_scripts_arr.findIndex(e => e&&e.key===arr_key);
	if(weak_state_index===-1) {
		console.log('prev gc',held);
	}
	let weak_state=null;
	if(weak_state_index>-1)
		weak_state=weak_scripts_arr[weak_state_index];
	console.log('gc',weak_state_index,arr_key,weak_state);
	weak_scripts_arr[weak_state_index]=null;
}
