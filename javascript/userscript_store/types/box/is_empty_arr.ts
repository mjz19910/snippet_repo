import {BoxExtractType} from "./create_box/BoxExtractType";

export function is_empty_arr(v: Extract<BoxExtractType, any[]>): v is [] {
	if(v.length === 0) {
		return true;
	}
	return false;
}
