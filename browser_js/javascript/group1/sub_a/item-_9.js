/* spell:words
-- version_list template --
v1 (old): snippet_repo/javascript/final/items/item9_v1.js
v2 (cur): snippet_repo/javascript/group1/sub_a/item-_9.js
*/

/**
 * @param {any[]} stats
 */
function log_stats(stats) {
	console.log(...stats.sort((a,b) => b[1]-a[1]))
}
const compressionStatsCalc_0=new CompressionStatsCalculator;
/**
 * @param {any} arr
 * @param {any} calc_win
 */
function sorted_comp_stats(arr,calc_win) {
	let ret=compressionStatsCalc.calc_compression_stats(arr,calc_win)
	ret.sort((a,b) => b[1]-a[1])
	return ret
}
/**
 * @param {any} arr
 * @param {number} start
 */
function next_chunk(arr,start) {
	let c_len;
	let s_arr
	let last
	for(let i=start;i<start+30;i++) {
		if(s_arr) {
			last=s_arr[0][1]
		}
		s_arr=sorted_comp_stats(arr,i)
		if(!last)
			continue
		let diff=last-s_arr[0][1]
		if(diff===0)
			continue
		if(diff===1) {
			c_len=i
			break
		}
		console.log(s_arr[0],...s_arr.slice(0,8).map((/** @type {any[]} */ e) => e[1]))
	}
	return c_len
}
/**
 * @param {any} e
 */
function get_ids(e) {
	let ss=JSON.stringify(e)
	return ids.value.indexOf(ss)
}
/**
 * @param {{ stats: any; arr: any; stats_win: any; }} obj
 */
function calc_cur(obj) {
	obj.stats=sorted_comp_stats(obj.arr,obj.stats_win)
}
/**
 * @param {{ stats: string | any[]; next: { value: any[]; log_val: any[]; rep_arr: any; arr: any; }; arr: any; }} obj
 * @param {any} max_id
 */
function calc_next(obj,max_id) {
	if(obj.stats.length===0) {
		return null
	}
	let f_val=obj.stats[0]
	let rep_val=f_val[0][1]
	obj.next.value=[max_id,'=',...rep_val]
	obj.next.log_val=[max_id,'=',f_val[0][0],rep_val,'*',f_val[1]]
	obj.next.rep_arr=compressionStatsCalc.replace_range(obj.arr,rep_val,max_id)
	if(obj.next.arr)
		return null
	let compress_result=compressionStatsCalc.compressor.try_compress(obj.next.rep_arr)
	obj.next.arr=compress_result[1]
	return compress_result
}
/**
 * @param {{ id?: number; arr_rep?: any; arr?: any; next?: any; }} obj
 */
function flat_obj(obj) {
	let ret=[]
	while(obj.next) {
		let {next}=obj
		ret.push(obj)
		obj=next
	}
	ret.push(obj)
	return ret
}
/**
 * @param {{ [s: string]: any; }} obj_1
 * @param {{ [s: string]: any; }} obj_2
 * @returns {boolean}
 */
function deep_eq(obj_1,obj_2) {
	if(obj_1===obj_2)
		return true
	if(obj_2 instanceof Array) {
		if(obj_1.length===obj_2.length) {
			for(let i=0;i<obj_1.length;i++) {
				let cur=obj_1[i]
				let cur_other=obj_2[i]
				if(!deep_eq(cur,cur_other)) {
					return false
				}
			}
			return true
		}
		return false
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2))
		if(is_eq)
			return true
		return false
	}
	if(obj_2 instanceof Map) {
		return deep_eq([...obj_1.entries()],[...obj_2.entries()])
	}
	throw new Error("Fixme")
}
/**
 * @param {string | any[]} arr
 * @param {any} value
 */
function deep_includes(arr,value) {
	for(let i=0;i<arr.length;i++) {
		let is_eq=deep_eq(arr[i],value)
		if(is_eq)
			return true
	}
	return false
}
compress_main(new CompressionStatsCalculator);
