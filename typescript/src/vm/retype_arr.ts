import {type_verify_extract} from "./type_verify_extract.js"

export function retype_arr<T>(in_val: null[]|T[]): T[]|null {
	if(type_verify_extract<T>(in_val)) {
		return in_val
	}
	return null
}
