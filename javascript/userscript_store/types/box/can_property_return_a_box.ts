import { is_obj_index_to_box } from "./is_namespace/is_obj_index_to_box";
import {force_type_upgrade} from "./force_type_upgrade";
import {ObjectIndexToBox} from "./ObjectIndexToBox";
import {ObjectIndexToOptBox} from "./ObjectIndexToOptBox";
export function can_property_return_a_box<T extends string>(
	v: ObjectIndexToOptBox<T, ObjectIndexToBox<T>>,
	prop: T
): v is ObjectIndexToOptBox<T, ObjectIndexToBox<T>> {
	let vv = prop;
	if(force_type_upgrade<ObjectIndexToBox<T>, {}>(v)) {
		let x=v[vv];
		if(is_obj_index_to_box(v, vv)) {
			return true;
		}
	}
	return false;
}
