import {TypeEraseClass} from "./TypeEraseClass";

export function do_type_erase_convert<T, U>(
	value: TypeEraseClass<U> | TypeEraseClass<T>,
	can_convert: (v: T | U) => v is U): value is TypeEraseClass<U> {
	if(can_convert(value.erase_value)) {
		return true;
	}
	return false;
}
