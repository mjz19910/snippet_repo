import {BoxExtractFunction} from "./extract/BoxExtractFunction";
import {async_box_run_normal_function} from "./run_normal_function";


export function async_box_wrap_normal_function(value_to_wrap: BoxExtractFunction) {
	return async_box_run_normal_function.bind(null, value_to_wrap);
}
