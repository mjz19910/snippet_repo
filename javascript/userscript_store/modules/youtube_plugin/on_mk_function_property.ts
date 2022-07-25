import {new_pv_fn} from "./new_pv_fn"
import {ud_func} from "./youtube_plugin.user"
import {MKState} from "./MKState"

/**
 * @param {MKState} cc
 */
export function on_mk_function_property(cc: MKState) {
	function with_this(this: {},...args: any) {
		new_pv_fn(this,cc,...args)
	}
	cc.value=with_this
	ud_func.add(cc.value)
}
