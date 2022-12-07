import {BaseCompression} from "./BaseCompression.js";
import {Repeat} from "./repeat/Repeat.js";

export class CompressTU {
	i: number;
	arr: TypeAOrTypeB<string,number>[]=[];
	ret: AnyOrRepeat2<string,number>[]=[];
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
	compress_rle_TU_to_TX(item: TypeAOrTypeB<string,number>) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(Repeat.from_TU_entry(item,off));
		this.i+=off-1;
		return true;
	}
	constructor(arr: TypeAOrTypeB<string,number>[]) {
		this.i=0;
		this.arr=arr;
		this.ret=[];
	}
}
