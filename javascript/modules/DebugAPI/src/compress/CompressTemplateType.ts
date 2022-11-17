import {Repeat} from "../repeat/Repeat.js";
import {ConstructorWithSymbolType} from "../repeat/ConstructorWithSymbolType.js";
import {AnyOrRepeat} from "../repeat/AnyOrRepeat.js";
import {BaseCompression} from "./BaseCompression.js";
import {CompressState} from "./CompressState.js";
import {RepeatTS} from "../repeat/RepeatTS.js";
import {AnyOrRepeatTS} from "../repeat/AnyOrRepeatTS.js";

export class CompressTemplateType<T extends InstanceType<U>,U extends ConstructorWithSymbolType> {
	i: number;
	arr: T[]=[];
	ret: AnyOrRepeatTS<T>[]=[];
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
		let item_map=RepeatTS.N.get_map_T<U,T,T>(this.constructor_key,item);
		let mq=RepeatTS.get_with<T>(item_map,item,times);
		if(mq !== null) {
			state.ret.push(mq);
		} else {
			let q=new RepeatTS(item,times);
			state.ret.push(q);
		}
		state.i+=times-1;
		return true;
	}
}
