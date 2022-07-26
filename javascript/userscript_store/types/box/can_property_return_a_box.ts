import {is_obj_index_to_box} from "./is_namespace/is_obj_index_to_box"
import {ObjectIndexToBox} from "./helper/ObjectIndexToBox"
import {ObjectIndexToOptBox} from "./helper/ObjectIndexToOptBox"
import {cast2} from "./helper/cast2"

export function can_property_return_a_box<T extends string>(
	value: ObjectIndexToOptBox<T>,
	property_key: T
): value is ObjectIndexToOptBox<T> {
	if(cast2<any,ObjectIndexToBox<T>>(value)) {
		if(is_obj_index_to_box(value,property_key)) {
			return true
		}
	}
	return false
}
