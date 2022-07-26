import {init_property_watcher_for_target} from "./init_property_watcher_for_target"

export function walk_key_path(arg_0: {value?: any; value_tr?: any; value_of?: any; noisy_flag?: any},arg_1: string,obj: {},mc?: string) {
	let match_parts_1
	let value_tr_match_res=arg_1.match(arg_0.value_tr)
	if(value_tr_match_res!==null) {
		match_parts_1=value_tr_match_res[0]
	} else {
		return mc
	}
	let arg_1_slice=arg_1.slice(match_parts_1.length+1)
	let index=arg_1_slice.indexOf('.')
	let property_name
	if(index>-1) {
		property_name=arg_1_slice.slice(0,index)
	} else {
		property_name=arg_1_slice
	}
	if(property_name.length>0) {
		if((arg_0.value_tr+'.'+property_name)==mc) {
			return arg_0.value_tr+'.'+property_name
		}
		init_property_watcher_for_target(obj,property_name,arg_0.value_tr+'.'+property_name,arg_0.noisy_flag)
		return arg_0.value_tr+'.'+property_name
	}
}
