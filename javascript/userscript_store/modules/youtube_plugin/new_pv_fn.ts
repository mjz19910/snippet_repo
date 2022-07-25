import {win_watch} from "./win_watch"
import {MKState} from "./MKState"

export function new_pv_fn(val: any,cc: MKState, /** @type {any[]} */ ...args: any[]) {
	let ret
	let act_cb_obj={fired: false,ret: ret}
	win_watch.dispatchEvent({type: 'new_window_object',data: {type: cc.value_tr,data: [cc.function_value,val,args,act_cb_obj]}})
	if(!act_cb_obj.fired&&cc.function_value) {
		ret=cc.function_value.apply(val,args)
	} else {
		ret=act_cb_obj.ret
	}
	return ret
}
