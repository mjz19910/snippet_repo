import {get_nearest_script} from "./get_nearest_script.js"
import {is_in_ignored_from_src_fn, is_in_userscript, scripts} from "./mod.js"
import {register_obj_with_registry} from "./register_obj_with_registry.js"
export function str_index_of_inject() {
	let cur_script=get_nearest_script()
	if(cur_script===void 0) {
		if(is_in_ignored_from_src_fn.flag)
			return
		if(!is_in_userscript.flag)
			throw new Error("No")
		// a userscript is running
		return
	}
	let had_script=false
	if(cur_script) {
		had_script=scripts.has(cur_script)
	}
	if(!had_script) {
		try {
			if(cur_script)
				scripts.add(cur_script)
		} catch(e) {
			debugger
		}
		let id=register_obj_with_registry(cur_script)
		console.log('new registry id',id)
	}
	if(!had_script) {
		if(!cur_script)
			return
		if(!(cur_script instanceof HTMLScriptElement))
			return
		// spell:ignore opentracker
		if(cur_script.src.includes("opentracker")) {
			if(cur_script)
				cur_script.remove()
			cur_script=null
			throw new Error("No tracking")
		}
		console.log(cur_script)
	}
	cur_script=null
}
