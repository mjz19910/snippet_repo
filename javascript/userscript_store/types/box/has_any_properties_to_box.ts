import {Box} from "./Box"
import {is_obj_index_to_box} from "./is_namespace/is_obj_index_to_box"
import {box_value_property_cache} from "./const"
import {ObjectIndexToBox} from "./helper/ObjectIndexToBox"
import {convert_to_type} from "./helper/convert_to_type"

export function has_any_properties_to_box<
	T extends string,
	C extends ObjectIndexToBox<T>
>(v: {[x: string]: Box},props: T[]): v is C {
	let on: typeof v|null=v
	let has_some_to_return_box=false
	for(let i=0;i<props.length;i++) {
		let vv=props[i]
		if(convert_to_type<C,{}>(on)) {
			if(is_obj_index_to_box(on,vv)) {
				box_value_property_cache.add(vv)
				has_some_to_return_box=true
			}
		}
	}
	return has_some_to_return_box
}
