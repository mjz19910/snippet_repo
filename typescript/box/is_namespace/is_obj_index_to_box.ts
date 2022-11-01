import {ObjectIndexToBox} from "../helper/ObjectIndexToBox.js"
import {is_box} from "./is_box.js"

export function is_obj_index_to_box<T extends string>(v: ObjectIndexToBox<T>,test: T) {
	if(v.hasOwnProperty(test)) {
		if(is_box(v[test])) {
			return true
		}
	}
	let v_proto: ObjectIndexToBox<T>[T]=Object.getPrototypeOf(v)
	do {
		if(v_proto===void 0)
			return false
		if(v_proto===null)
			return false
		if(v_proto.hasOwnProperty(test)) {
			if(is_box(v[test])) {
				return true
			}
		}
		v_proto=Object.getPrototypeOf(v_proto)
	} while(v_proto)
	return false
}
