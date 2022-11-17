import {BaseCompression} from "./BaseCompression";
import {CompressionStatsCalculator} from "./CompressionStatsCalculator.js";
import {Repeat} from "./Repeat";

let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats: [],
};

export class MulCompression extends BaseCompression {
	/**
	 * @template T
	 * @param {import("./TU.js").TU<string, number>[]} arr
	 * @returns {T}
	 * // import("./DualR.js").DualR
	 * @todo (MulCompression,try_compress_dual)
	 */
	try_compress_dual(arr) {
		/**@type {import("./TX.js").TX<string, number>[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						switch(item[0]) {
							case 'T': ret.push(['T',Repeat.get(item[1],off)]); break;
							case 'U': ret.push(['U',Repeat.get_num(item[1],off)]); break;
						}
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		if(this.did_compress(arr,ret))
			return [true,ret];
		return [false,arr];
	}
	/**
	 * @template {import("./ST.js").ST} U
	 * @template {InstanceType<U>} T
	 * @arg {U} c_k
	 * @arg {T[]} arr
	 * @returns {[true, import("./X.js").X<T>[]]|[false,T[]]} */
	try_compress_T(c_k,arr) {
		/**@type {import("./X.js").X<T>[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						let mp=Repeat.N.get_map_T(c_k,item);
						Repeat.get_with(mp,item,off);
						ret.push(new Repeat(item,off));
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result_T(c_k,arr,ret);
	}

	/**
	 * @template {InstanceType<U>} T
	 * @template {abstract new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {import("./X.js").X<T>[]} ret
	 * @returns {[true, import("./X.js").X<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(this.did_compress(arr,ret))
			return [true,ret];
		return [false,arr];
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				if(item===arr[i+1]) {
					let off=1;
					while(item===arr[i+off]) {
						off++;
					}
					if(off>1) {
						ret.push(`${item}${off}`);
						i+=off-1;
						continue;
					}
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
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
