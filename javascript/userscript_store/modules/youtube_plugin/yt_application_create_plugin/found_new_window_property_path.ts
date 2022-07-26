import {object_property_watcher} from "./object_property_watcher"
import {PropertyWatcher} from "./PropertyWatcher"

export function found_new_window_property_path(val: any,cc: PropertyWatcher,...args: any[]) {
	let ret
	let act_cb_obj={fired: false,ret: ret}
	object_property_watcher.dispatchEvent({type: 'new-window-property-path',data: {type: cc.value_tr,data: [cc.function_value,val,args,act_cb_obj]}})
	if(!act_cb_obj.fired&&cc.function_value) {
		ret=cc.function_value.apply(val,args)
	} else {
		ret=act_cb_obj.ret
	}
	return ret
}
