import {Box} from "../Box";
import {UnboxType} from "./AsyncFunctionBox";
import {async_box_extract_box_inner_all} from "./async_box_extract_box_inner_all";
import {async_box_create_box} from "./async_box_create_box";
import {UnboxTypeFunction} from "./UnboxTypeFunction";


export function async_box_run_normal_function(value_to_wrap: UnboxTypeFunction, this_: Box, ...args: Box[]): Box {
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
	return async_box_create_box(ret);
}
