import {TypeEraseClass} from "../TypeEraseClass"

export function convert_type_erase_convert<T,U>(
	value: TypeEraseClass<T>|TypeEraseClass<U>,
	can_convert: (v: T|U) => v is U): value is TypeEraseClass<U> {
	if(can_convert(value.erase_value)) {
		return true
	}
	return false
}
