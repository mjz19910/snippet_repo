import {Box} from "../Box";
import {async_box_extract_box_inner_all} from "./async_box_extract_box_inner_all";
import {UnboxType} from "./AsyncFunctionBox";


export function async_box_wrap_void_function(value_to_wrap: (this: UnboxType, ...args: UnboxType[]) => void) {
	return function wrap_inner(this_: Box, ...args: Box[]): void {
		let real_args: UnboxType[] = [];
		for(let i = 0;i < args.length;i++) {
			let cur = args[i];
			real_args.push(async_box_extract_box_inner_all(cur));
		}
		let real_this: UnboxType;
		if(this_ === null) {
			real_this = this_;
		} else if(typeof this_ === 'object') {
			real_this = this_.value;
		}
		let ret = value_to_wrap.apply(real_this, real_args);
		return ret;
	};
}
