import {BaseCompression} from "./BaseCompression";
import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator.js/index.js";
import {CompressState} from "./CompressState";
import {Repeat} from "./Repeat";

let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats: [],
};

export class MulCompression extends BaseCompression {
	/**
	 * @param {{i:number,arr:import("./TU.js").TU<string, number>[],ret:import("./TX.js").TX<string, number>[]}} state
	 * @arg {import("./TU.js").TU<string, number>} item
	 */
	compress_rle_TU_to_TX(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return true;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return true;
		state.ret.push(Repeat.from_TU_entry(item,off));
		state.i+=off-1;
		return true;
	}
	/**
	 * @param {import("./TU.js").TU<string, number>[]} arr
	 * @returns {import("./DualR.js").DualR}
	 * @todo (MulCompression,try_compress_dual)
	 */
	try_compress_dual(arr) {
		/**@type {CompressState<import("./TU.js").TU<string, number>, import("./TX.js").TX<string, number>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.compress_result_state(state);
	}
	/**
	 * @template {import("./ST.js").ST} U
	 * @template {InstanceType<U>} T
	 * @arg {U} constructor_key
	 * @arg {T[]} arr
	 * @returns {[true, import("./X.js").X<T>[]]|[false,T[]]} */
	try_compress_T(arr,constructor_key) {
		/**@type {import("./X.js").X<T>[]} */
		let ret=[];
		/**@type {CompressState<T,import("./X.js").X<T>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item,constructor_key);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.compress_result_state(state);
	}
	/**
	 * @template {import("./ST.js").ST} U
	 * @template {InstanceType<U>} T
	 * @arg {CompressState<T, import("./X.js").X<T>>} state
	 * @arg {T} item
	 * @arg {U} constructor_key
	 * */
	compress_rle_T_X(state,item,constructor_key) {
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

	/**
	 * @template {InstanceType<U>} T
	 * @template {abstract new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {import("./X.js").X<T>[]} ret
	 * @returns {[true, import("./X.js").X<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(this.did_compress(arr,ret)) return [true,ret];
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
		return this.compress_result_state(state);
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
					for(let j=0;j<parsed;j++)
						ret.push(item_type);
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
		if(success)
			arr=res;
		for(let i=0;i<4;i++) {
			stats_calculator_info.stats_calculator.calc_for_stats_index(stats_calculator_info.compression_stats,arr,i);
			let ls=stats_calculator_info.compression_stats[i];
			if(ls.length>0) {
				continue;
			}
			break;
		}
		let res_1=this.try_compress(arr);
		if(res_1[0])
			return res_1[1];
		return arr;
	}
}
