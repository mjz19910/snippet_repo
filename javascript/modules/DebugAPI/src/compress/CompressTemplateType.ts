import {ConstructorWithSymbolType} from "../repeat/ConstructorWithSymbolType.js";
import {BaseCompression} from "./BaseCompression.js";
import {RepeatTS} from "../repeat/Repeat.js";
import {AnyOrRepeatTS} from "../repeat/AnyOrRepeat.js";
import {type} from "jquery";
import {NumType} from "../NumType.js";

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
		let item_map=RepeatTS.N.get_map_T_or<U,T>(this.constructor_key,item);
		let map=item_map(NumType,times);
		let mq=map.get(NumType.type);
		if(!mq) return false;
		let mx=mq(this.constructor_key,item);
		let ma=mx.get(this.constructor_key.type);
		if(ma!==void 0) {
			state.ret.push(ma);
		} else {
			let q=new RepeatTS(item,times);
			state.ret.push(q);
		}
		state.i+=times-1;
		return true;
	}
}
