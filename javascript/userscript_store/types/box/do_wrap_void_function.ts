import {Box} from "./Box"
import {extract_box} from "./extract/extract_box"
import {BoxExtractType} from "./helper/BoxExtractType"
export function do_wrap_void_function(value_to_wrap: (this: BoxExtractType,...args: BoxExtractType[]) => void,this_: Box,...args: Box[]): void {
	let real_args: BoxExtractType[]=[]
	for(let i=0;i<args.length;i++) {
		let cur=args[i]
		real_args.push(extract_box(cur))
	}
	let real_this: BoxExtractType
	if(this_===null) {
		real_this=this_
	} else if(typeof this_==='object') {
		real_this=this_.value
	}
	let ret=value_to_wrap.apply(real_this,real_args)
	return ret
}
