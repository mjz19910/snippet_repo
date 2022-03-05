import {do_type_erase_convert} from "./do_type_erase_convert";
import {is_void} from "./is_void";
import {Box} from "./mod";
import {RealVoidBox} from "./RealVoidBox";
import {TypeEraseClass} from "./TypeEraseClass";
export function create_box_from_obj_with_keys<T>(value: T): Box {
	let void_holder = new TypeEraseClass(value);
	if(do_type_erase_convert<T, void>(void_holder, is_void)) {
		return new RealVoidBox(void_holder.get_value());
	}
	console.warn('unable to box', value);
	throw new Error("Need box for iterable properties of return value");
}
