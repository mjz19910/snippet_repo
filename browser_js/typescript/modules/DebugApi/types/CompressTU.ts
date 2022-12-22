import {BaseCompression} from "./BaseCompression.js";
import {Repeat_1} from "./repeat/Repeat_1.js";

export class CompressTU {
	i: number;
	arr: AltPair<string,number>[]=[];
	ret: AnyOrRepeat2_1<string,number>[]=[];
	try_compress_dual() {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state(this);
	}
	compress_rle_TU_to_TX(item: AltPair<string,number>) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(Repeat_1.from_TU_entry(item,off));
		this.i+=off-1;
		return true;
	}
	constructor(arr: AltPair<string,number>[]) {
		this.i=0;
		this.arr=arr;
		this.ret=[];
	}
}
