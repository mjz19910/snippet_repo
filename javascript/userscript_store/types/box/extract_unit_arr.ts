import {Box} from "./Box";

export function async_box_extract_unit_arr(value: [] | Box[]): value is [] {
	if(value.length === 0) {
		return true;
	}
	return false;
}
