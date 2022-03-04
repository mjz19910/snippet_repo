import {Box} from "./mod";
import {RealVoidBox} from "./RealVoidBox";
import VoidBox from "./VoidBox";

function t_is_void<T>(v:T|void):v is void {
	if(v === void 0){
		return true;
	}
	return false;
}

function drop_type<T>(_v:T):_v is T&void {
	return true;
};

function drop_type_2<T extends void>(_v:T|void):_v is void {
	return true;
}

function exclude_type<T>(_v:T):_v is Extract<T, void> {
	return true;
}

export function create_box_from_obj_with_keys<T>(value: T):Box {
	if(t_is_void(value)){
		if(exclude_type<T>(value)){
			let x:void=value;
			return new RealVoidBox(x);
		}
		if(drop_type_2(value)){
			value;
		}
		if(drop_type(value)){
			value;
		}
		return new VoidBox;
	}
	console.warn('unable to box', value);
	throw new Error("Need box for iterable properties of return value");
}
