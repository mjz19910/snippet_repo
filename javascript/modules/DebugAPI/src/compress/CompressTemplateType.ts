import {Repeat} from "../repeat/Repeat.js";
import {ConstructorWithSymbolType} from "../repeat/ConstructorWithSymbolType.js";
import {AnyOrRepeat} from "../repeat/AnyOrRepeat.js";
import {BaseCompression} from "./BaseCompression.js";
import {CompressState} from "./CompressState.js";
import {RepeatTS} from "../repeat/RepeatTS.js";

export class CompressTemplateType<T extends InstanceType<U>,U extends ConstructorWithSymbolType> {
	i: number;
	arr: T[]=[];
	ret: AnyOrRepeat<T>[]=[];
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
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		let item_map=RepeatTS.N.get_map_T(this.constructor_key,item);
		let mq=RepeatTS.get_with<T>(item_map,item,off);
		console.log(mq);
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}
}
