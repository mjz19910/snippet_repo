import {MulCompression} from "../src/compress/MulCompression.js";
import {range_matches} from "../src/range_matches.js";
import {to_tuple_arr} from "../src/to_tuple_arr.js";
<<<<<<< HEAD
import {max_id} from "../src/max_id.js";
=======
>>>>>>> 19d8bcac (u)
import {CompressTU} from "./CompressTU.js";

export class CompressionStatsCalculator {
	/**
	 * (MulCompression,try_compress_dual)
	 */
	try_compress_dual(arr: AltPair<string,number>[]): DualR_1 {
		let ex=new CompressTU(arr);
		return ex.try_compress_dual();
	}
	hit_counts:number[]=[];
	cache:string[]=[];
	compressor=new MulCompression;
	constructor() {
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
		/**@type {MulCompression} */
		this.compressor=new MulCompression;
	}
	/**@arg {[string, number][][]} stats_arr @arg {string[]} arr @arg {number} index */
	calc_for_stats_index(stats_arr: [string,number][][],arr: string[],index: number) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
	/** @param {number} index */
	add_hit(index: number) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index]=1;
		} else
			this.hit_counts[index]++;
	}
	/** @param {string} key */
	add_item(key: string) {
		let index=this.cache.indexOf(key);
		if(index==-1) {
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset() {
		this.cache.length=0;
		this.hit_counts.length=0;
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	calc_compression_stats(arr: string[],win_size: number) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		let keys=this.map_keys();
		let values=this.map_values();
		return to_tuple_arr<string,number>(keys,values);
	}
	replace_range<T,U>(arr: T[],range: number,replacement: U): (["T",T]|["U",U])[] {
		/**@type {(["T", T]|["U", U])[]} */
		let ret: (["T",T]|["U",U])[]=[];
		for(let i=0;i<arr.length;i++) {
			if(range_matches(arr,range,i)) {
				i+=1;
				ret.push(['U',replacement]);
				continue;
			}
			let rest=arr[i];
			ret.push(['T',rest]);
		}
		return ret;
	}
	test() {
		let obj={
			arr: [],
		};
		let rep_val=0.03/(100*4*1);
		let res=this.replace_range(obj.arr,rep_val,max_id.value);
		console.log("compressed",res);
	}
}
