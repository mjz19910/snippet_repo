import {async_box_is_box} from "./async_box_is_box";

export function async_box_extract_like_type<T extends PropertyDescriptor>(value: PropertyDescriptor): value is T {
	if(!value.value)
		return false;
	// can't check innards
	if(value.value.length === 0)
		return false;
	let in_type = value.value[0];
	if(async_box_is_box(in_type)) {
		return true;
	}
	return false;
}
