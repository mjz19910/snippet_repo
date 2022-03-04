import {UnboxTypeFunction} from "./UnboxTypeFunction";
import {async_box_run_normal_function} from "./async_box_run_normal_function";


export function async_box_wrap_normal_function(value_to_wrap: UnboxTypeFunction) {
	return async_box_run_normal_function.bind(null, value_to_wrap);
}
