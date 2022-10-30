import {CleanupType} from "./CleanupType"
import {scripts_tokens,weak_scripts_arr} from "./mod"

export function script_reg_cleanup_callback(held: CleanupType) {
	let arr_key=held.arr_key
	let weak_state_index=weak_scripts_arr.findIndex(e => e&&e.key===arr_key)
	let token_index=scripts_tokens.findIndex(e => e&&e.key===arr_key)
	if(weak_state_index===-1) {
		console.log('prev gc',held)
	}
	let token=null
	let weak_state=null
	if(token_index>-1)
		token=scripts_tokens[token_index]
	if(weak_state_index>-1)
		weak_state=weak_scripts_arr[weak_state_index]
	console.log('gc',weak_state_index,token_index,arr_key,token,weak_state)
	weak_scripts_arr[weak_state_index]=null
	scripts_tokens[token_index]=null
}
