import {BaseCompression} from "./BaseCompression";
import {CompressState} from "./CompressState";
import {Repeat} from "../repeat/Repeat";
import {stats_calculator_info} from "./stats_calculator_info.js";
import {NumType} from "../NumType.js";

export class MulCompression extends BaseCompression {
	/**
	 * @template {import("../repeat/ConstructorWithSymbolType.js").ConstructorWithSymbolType} U
	 * @template {InstanceType<U>} T
	 * @arg {U} constructor_key
	 * @arg {T[]} arr
	 * @returns {[true, import("../repeat/AnyOrRepeat.js").AnyOrRepeat<T>[]]|[false,T[]]} */
	try_compress_T(arr,constructor_key) {
		/**@type {CompressState<T,import("../repeat/AnyOrRepeat.js").AnyOrRepeat<T>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item,constructor_key);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompression.compress_result_state(state);
	}
	/**
	 * @template {import("../repeat/ConstructorWithSymbolType.js").ConstructorWithSymbolType} U
	 * @template {InstanceType<U>} T
	 * @arg {CompressState<T, import("../repeat/AnyOrRepeat.js").AnyOrRepeat<T>>} state
	 * @arg {T} item
	 * @arg {U} constructor_key
	 * */
	compress_rle_T_X(state,item,constructor_key) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		let compression_map=Repeat.N.get_map_T(constructor_key,item);
		Repeat.get_with(compression_map,item,off);
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}

	/**
	 * @template {InstanceType<U>} T
	 * @template {abstract new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {import("../repeat/AnyOrRepeat.js").AnyOrRepeat<T>[]} ret
	 * @returns {[true, import("../repeat/AnyOrRepeat.js").AnyOrRepeat<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(MulCompression.did_compress(arr,ret)) return [true,ret];
		return [false,arr];
	}
	/**
	 * @param {{i:number,arr:string[],ret:string[]}} state
	 * @arg {string} item
	 */
	compress_rle(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(`${item}${off}`);
		state.i+=off-1;
		return true;
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		/**@type {CompressState<string, string>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompression.compress_result_state(state);
	}
	/**@arg {string[]} arr @returns {[res: boolean,dst: string[]]} */
	try_decompress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				let [item_type,num_data]=[item[0],item.slice(1)];
				let parsed=parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j=0;j<parsed;j++) ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	/**@arg {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		for(let i=0;i<4;i++) {
			stats_calculator_info.stats_calculator.calc_for_stats_index(stats_calculator_info.compression_stats,arr,i);
			let ls=stats_calculator_info.compression_stats[i];
			if(ls.length>0) continue;
			break;
		}
		let res_1=this.try_compress(arr);
		if(res_1[0]) return res_1[1];
		return arr;
	}
}
