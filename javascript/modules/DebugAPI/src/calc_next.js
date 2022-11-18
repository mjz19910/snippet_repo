import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator.js";

/**
 * @param {CompressionStatsCalculator} stats
 * @param {IDValueData} obj
 * @param {number} max_id
 */
export function calc_next(stats,obj,max_id) {
	if(obj.stats===void 0||(obj.stats!==void 0&&obj.stats.length===0)) {
		return null;
	}
	let f_val=obj.stats[0];
	let rep_val=f_val[1];
	if(!obj.next) {
		return null;
	}
	/**@type {IDValueData} */
	let next=obj;
	next.value=[max_id,'=',rep_val];
	next.log_val=[max_id,'=',f_val[0],f_val[1]];
	if(obj.arr_str===void 0)
		throw new Error("No arr");
	next.arr_dual=stats.replace_range(obj.arr_str,rep_val,max_id);
	if(next.arr_str)
		return null;
	/**@type {import("./DualR.js").DualR} */
	let compress_result=stats.compressor.try_compress_dual(next.arr_dual);
	if(!compress_result[0]) {
		/**@type {import("./repeat/TypeAOrTypeB.js").TypeAOrTypeB<string, number>[]} */
		let res=[];
		for(let i of compress_result[1]) {
			/**@type {import("./repeat/TypeAOrTypeB.js").TypeAOrTypeB<string, number>|[]} */
			let res_1=[];
			switch(i[0]) {
				case 'T': if(typeof i[1]==='string')
					res_1=[i[0],i[1]]; break;
				case 'U': if(typeof i[1]==='number')
					res_1=[i[0],i[1]]; break;
			}
			if(!res_1) {
				throw new Error();
			}
			if(res_1.length)
				res.push(res_1);
		}
		next.arr_dual=res;
	} else {
		next.arr_dual_x=compress_result[1];
	}
	return compress_result;
}
