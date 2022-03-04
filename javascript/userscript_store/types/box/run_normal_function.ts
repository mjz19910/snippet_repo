import {Box} from "./Box";
import {BoxExtractType} from "./extract/BoxExtractType";
import {extract_box} from "./extract/extract_box";
import {create_box} from "./create_box";
import {BoxExtractFunction} from "./extract/BoxExtractFunction";


export function async_box_run_normal_function(value_to_wrap: BoxExtractFunction, this_: Box, ...args: Box[]): Box {
	let real_args: BoxExtractType[] = [];
	for(let i = 0;i < args.length;i++) {
		let cur = args[i];
		real_args.push(extract_box(cur));
	}
	let real_this: BoxExtractType;
	if(this_ === null) {
		real_this = this_;
	} else if(typeof this_ === 'object') {
		real_this = this_.value;
	}
	let ret = value_to_wrap.apply(real_this, real_args);
	return create_box(ret);
}
