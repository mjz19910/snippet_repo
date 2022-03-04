import {is_box} from "./is_box";
export function extract_like_type<T extends PropertyDescriptor>(value: PropertyDescriptor): value is T {
	if(!value.value)
		return false;
	// can't check innards
	if(value.value.length === 0)
		return false;
	let in_type = value.value[0];
	if(is_box(in_type)) {
		return true;
	}
	return false;
}
