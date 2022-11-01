import {is_obj_index_to_box} from "./is_namespace/is_obj_index_to_box.js";
import {box_value_property_cache} from "./const.js";
import {ObjectIndexToBox} from "./helper/ObjectIndexToBox.js";
import {convert_to_type} from "./helper/convert_to_type.js";

export function has_any_properties_to_box<
	T extends string,
	C extends ObjectIndexToBox<T>
>(v: {},props: T[]): v is C {
	let has_some_to_return_box=false;
	for(let i=0;i<props.length;i++) {
		let vv=props[i];
		let val1=convert_to_type<{},ObjectIndexToBox<T>>(v);
		if(!is_obj_index_to_box(val1,vv)) continue;
		box_value_property_cache.add(vv);
		has_some_to_return_box=true;
	}
	return has_some_to_return_box;
}
