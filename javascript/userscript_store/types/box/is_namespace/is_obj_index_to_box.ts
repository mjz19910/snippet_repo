import {is_box} from "./is_box";
import {ObjIndexToBox} from "./ObjIndexToBox";
export function is_obj_index_to_box<T extends string>(v: ObjIndexToBox<T>, test: T) {
	if(v.hasOwnProperty(test)) {
		if(is_box(v[test])) {
			return true;
		}
	}
	let v_proto: ObjIndexToBox<T>[T] = Object.getPrototypeOf(v);
	do {
		if(v_proto === void 0)
			return false;
		if(v_proto === null)
			return false;
		if(v_proto.hasOwnProperty(test)) {
			if(is_box(v[test])) {
				return true;
			}
		}
		v_proto = Object.getPrototypeOf(v_proto);
	} while(v_proto);
	return false;
}
