import {Box} from "./Box";
import {is_obj_index_to_box} from "./is_obj_index_to_box";
import {force_to_type_downgrade} from "./force_to_type_downgrade";
import {force_type_upgrade} from "./force_type_upgrade";
import {box_able_properties_cache} from "./create_box";
import {ObjIndexToBox} from "./ObjIndexToBox";

export function has_any_properties_to_box<T extends string, C extends ObjIndexToBox<T>>(v: {[x: string]: Box;}, props: T[]): v is C {
	let on: typeof v | null = v;
	let has_some_to_return_box = false;
	for(let i = 0;i < props.length;i++) {
		let vv = props[i];
		if(force_to_type_downgrade<{}>(on)) {
			if(force_type_upgrade<C, {}>(on)) {
				if(is_obj_index_to_box(on, vv)) {
					box_able_properties_cache.add(vv);
					has_some_to_return_box = true;
				}
			}
		}
	}
	return has_some_to_return_box;
}
