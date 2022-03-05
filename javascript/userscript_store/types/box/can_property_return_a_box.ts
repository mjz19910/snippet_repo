import {is_obj_index_to_box} from "./is_obj_index_to_box";
import {force_to_type_downgrade} from "./force_to_type_downgrade";
import {force_type_upgrade} from "./force_type_upgrade";
import {ObjIndexToBox} from "./ObjIndexToBox";
import {ObjIndexToOptBox} from "./ObjIndexToOptBox";
export function can_property_return_a_box<T extends string>(
	v: ObjIndexToOptBox<T, ObjIndexToBox<T>>,
	prop: T
): v is ObjIndexToOptBox<T, ObjIndexToBox<T>> {
	let vv = prop;
	if(force_to_type_downgrade<{}>(v)) {
		let obj_v: {} = v;
		if(force_type_upgrade<ObjIndexToBox<T>, {}>(obj_v)) {
			if(is_obj_index_to_box(obj_v, vv)) {
				return true;
			}
		}
	}
	return false;
}
