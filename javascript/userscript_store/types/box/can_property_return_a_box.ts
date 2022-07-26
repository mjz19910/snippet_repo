import {is_obj_index_to_box} from "./is_namespace/is_obj_index_to_box"
import {ObjectIndexToBox} from "./helper/ObjectIndexToBox"
import {ObjectIndexToOptBox} from "./helper/ObjectIndexToOptBox"
import {convert_to_type} from "./helper/convert_to_type"

export function can_property_return_a_box<T extends string>(
	v: ObjectIndexToOptBox<T>,
	prop: T
): v is ObjectIndexToOptBox<T> {
	let vv=prop
	if(convert_to_type<ObjectIndexToBox<T>,{}>(v)) {
		if(is_obj_index_to_box(v,vv)) {
			return true
		}
	}
	return false
}
