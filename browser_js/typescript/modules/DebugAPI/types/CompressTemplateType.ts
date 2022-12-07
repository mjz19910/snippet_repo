import {BaseCompression} from "../src/compress/BaseCompression.js";
import {Repeat_1} from "./repeat/Repeat_1.js";

export class CompressTemplateType<T extends InstanceType<U>,U extends RecordKey<U>> {
	i: number;
	arr: T[]=[];
	ret: AnyOrRepeat_1<T>[]=[];
	constructor_key: U;
	constructor(arr: T[],constructor_key: U) {
		this.i=0;
		this.arr=arr;
		this.constructor_key=constructor_key;
		this.ret=[];
	}
	try_compress() {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state(state);
	}
	compress_rle(item: T) {
		let state=this;
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let j=1;
		while(item===state.arr[state.i+j]) j++;
		if(j==1) return false;
		let times=j;
		let item_map=Repeat_1.N.get_map_T_or(this.constructor_key,item);
		console.log(item_map);
		state.ret.push(new Repeat_1(item,times));
		state.i+=times-1;
		return true;
	}
}
