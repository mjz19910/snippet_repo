import {is_obj_index_to_box} from "./is_namespace/is_obj_index_to_box.js";
import {box_value_property_cache} from "./const.js";
import {ObjectIndexToBox} from "./helper/ObjectIndexToBox.js";

export function has_any_properties_to_box<
	T extends string,
	C extends ObjectIndexToBox<T>
>(v: C,props: T[]): v is C {
	let has_some_to_return_box=false;
	for(let i=0;i<props.length;i++) {
		let vv=props[i];
		if(!is_obj_index_to_box(v,vv)) continue;
		box_value_property_cache.add(vv);
		has_some_to_return_box=true;
	}
	return has_some_to_return_box;
}
