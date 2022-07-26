import {MKState} from "./MKState"
import {on_mk_function_property} from "./on_mk_function_property"
import {walk_key_path} from "../walk_key_path"
import {mk_tree_arr} from "./mk_tree_arr"

export function on_mk_new_property(cc: MKState,obj: {}) {
	if(obj instanceof Function) {
		cc.function_value=obj
		on_mk_function_property(cc)
	} else {
		let mc
		let ck_i=0
		let ck_str=mk_tree_arr[ck_i]
		mc=walk_key_path(cc,ck_str,obj,mc)
		for(;ck_i<mk_tree_arr.length;ck_i++) {
			ck_str=mk_tree_arr[ck_i]
			mc=walk_key_path(cc,ck_str,obj,mc)
		}
		cc.value=obj
	}
}
