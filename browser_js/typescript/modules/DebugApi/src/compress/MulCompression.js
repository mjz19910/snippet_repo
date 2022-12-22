import {stats_calculator_info} from "./stats_calculator_info.js";
import {BaseCompression} from "./BaseCompression.js";
import {CompressState} from "./CompressState.js";
import {Repeat_1} from "../../types/repeat/Repeat_1.js";

export class MulCompression extends BaseCompression {
	/**
	 * @template T
	 * @arg {T[]} arr
	 * @returns {[true, AnyOrRepeat_1<T>[]]|[false,T[]]} */
	try_compress_T(arr) {
		/**@type {CompressState<T,AnyOrRepeat_1<T>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompression.compress_result_state(state);
	}
	/**
	 * @template {RecordKey<symbol>} U
	 * @template {InstanceType<U>} T
	 * @arg {CompressState<T, AnyOrRepeat_1<T>>} state
	 * @arg {T} item
	 * */
	compress_rle_T_X(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(new Repeat_1(item,off));
		state.i+=off-1;
		return true;
	}

	/**
	 * @template {InstanceType<U>} T
	 * @template {abstract new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {AnyOrRepeat_0<T>[]} ret
	 * @returns {[true, AnyOrRepeat_0<T>[]]|[false,T[]]} */
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
