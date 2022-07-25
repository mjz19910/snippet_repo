import {MKState} from "./MKState"
import {on_mk_property_set} from "./on_mk_property_set"
import {locked_set} from "./youtube_plugin.user"

export function mk_run(cc: MKState) {
	if(locked_set.has(cc.target)&&locked_set.get(cc.target).names.indexOf(cc.property_key)>-1) {
		return cc
	}
	Object.defineProperty(cc.target,cc.property_key,{
		configurable: true,
		enumerable: true,
		get() {
			return cc.value
		},
		set(val) {
			on_mk_property_set(cc,val)
		}
	})
	if(locked_set.has(cc.target)) {
		locked_set.get(cc.target).names.push(cc.property_key)
	} else {
		locked_set.set(cc.target,{names: [cc.property_key]})
	}
	return cc
}
