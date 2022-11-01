import {Box} from "./Box.js"
import {is_box} from "./is_namespace/is_box.js"

export function extract_like_type<
	T,U extends TypedPropertyDescriptor<T>,C extends TypedPropertyDescriptor<Box>
>(property_descriptor: U|C): property_descriptor is C {
	if(!('value' in property_descriptor)) return false
	return is_box(property_descriptor.value)
}
