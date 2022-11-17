import {Repeat} from "../repeat/Repeat.js";
import {ConstructorWithSymbolType} from "../repeat/ConstructorWithSymbolType.js";
import {AnyOrRepeat} from "../repeat/AnyOrRepeat.js";
import {BaseCompression} from "./BaseCompression.js";
import {CompressState} from "./CompressState.js";

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
	try_compress_T_this() {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state(state);
	}
	try_compress_T(): [true,AnyOrRepeat<T>[]]|[false,T[]] {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state(state);
	}
	compress_rle_T_X_this(item: T,constructor_key: U) {
		let state=this;
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		let mp=Repeat.N.get_map_T(constructor_key,item);
		Repeat.get_with(mp,item,off);
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}
	compress_rle_T_X(item: T) {
		let state=this;
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		let mp=Repeat.N.get_map_T(this.constructor_key,item);
		Repeat.get_with(mp,item,off);
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}
}
