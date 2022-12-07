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
	obj.next.rep_arr=csc.replace_range(obj.arr,rep_val,max_id)
	if(obj.next.arr)
		return null
	let compress_result=csc.comp.try_compress(obj.next.rep_arr)
	obj.next.arr=compress_result[1]
	return compress_result
}
/**
 * @param {{ [x: string]: any; id?: any; arr_rep?: any; arr?: any; stats_win?: any; stats?: any; next?: any; }} obj
 */
function run_calc(obj) {
	obj.stats_win=2
	calc_cur(obj)
	if(obj.stats.length===0) {
		return null
	}
	obj.next={
		id: obj.id+1
	}
	max_id++
	let {next: nx1,...br_obj}=obj
	br_obj.next={
		id: obj.id+1
	}
	br_obj.stats_win++
	calc_cur(br_obj)
	let br_res=calc_next(br_obj,max_id)
	let res=calc_next(obj,max_id)
	while(br_obj.next.arr&&br_obj.next.arr.length+1<obj.next.arr.length&&obj.stats_win<30) {
		let br_st=br_obj.next.arr.length
		br_obj.stats_win++
		obj.stats_win++
		calc_cur(br_obj)
		br_obj.next={
			id: obj.id+1
		}
		br_res=calc_next(br_obj,max_id)
		calc_cur(obj)
		obj.next={
			id: obj.id+1
		}
		res=calc_next(obj,max_id)
		if(!br_obj.next.arr) continue
		let cd=br_st-br_obj.next.arr.length
		if(cd<=1) break
	}
	if(!res) {
		return [false,null]
	}
	return [true,res]
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
 * @param {string | number} val
 */
function do_decode(val) {
	if(typeof val==='number') {
		let fv=g_obj_arr.slice(1).find((/** @type {{ value: number[]; }} */ e) => e.value[0]===val)
		if(!fv) {
			console.log('not found',val)
			return
		}
		id_map[val]=fv.value.slice(2)
	} else {
		let fv=g_obj_arr.slice(1).find((/** @type {{ value: any[]; }} */ e) => e.value[0]===val.value)
		if(!fv) {
			console.log('not found',val)
			return
		}
		id_map[val.value]=fv.value.slice(2)
	}
}
/**
 * @param {string | number} e
 */
function try_decode(e,deep=true) {
	if(typeof e==='number') {
		if(dr_map[e]) {
			return dr_map[e]
		}
		if(id_map[e]) {
			let res=id_map[e]
			if(!deep) return res
			let dec_res=[]
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i])
				dec_res[i]=cur_res
			}
			dr_map[e]=dec_res
			return dec_res
		}
		if(ids_dec[e]) {
			return ids_dec[e]
		}
	}
	if(e instanceof g_api.Repeat) {
		if(dr_map[e.value]) {
			return dr_map[e.value]
		}
		if(id_map[e.value]) {
			let res=id_map[e.value]
			let dec_res=[]
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i])
				dec_res[i]=cur_res
			}
			window.dr_map??=[]
			let ret=new g_api.Repeat(dec_res,e.times)
			dr_map[e.value]=ret
			return ret
		}
		if(ids_dec[e.value]) {
			return new g_api.Repeat(ids_dec[e.value],e.times)
		}
	}
	return null
}
function init_decode() {
	window.dr_map=[]
	ids_dec=ids.map((/** @type {string} */ e) => JSON.parse(e))
	id_map=[]
}
/**
 * @param {any} e
 */
function decode_map(e) {
	if(!window.id_map)
		init_decode()
	let dec=try_decode(e)
	if(!dec) {
		do_decode(e)
	}
	dec=try_decode(e)
	if(!dec) {
		console.log(e)
	} else {
		return dec
	}
	return e
}
/**
 * @param {{ [s: string]: any; }} obj_1
 * @param {{ [s: string]: any; }} obj_2
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
function compress_init() {
	window.dr_map=[]
	window.csc??(csc=new CompressionStatsCalculator)
	csc.comp=new window.g_api.CompressRepeated
	if(window.g_auto_buy) {
		src_arr=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1]
	} else {
		src_arr=g_dom_observer.event_log
	}
}
function compress_main() {
	compress_init()
	ids=[...new Set((src_arr.map((/** @type {any} */ e) => JSON.stringify(e))))]
	id_groups=[]
	src_arr.forEach((/** @type {any} */ e) => {
		let ii=ids.indexOf(JSON.stringify(e))
		id_groups[ii]??=[]
		if(!deep_includes(id_groups[ii],e))
			id_groups[ii].push(e)
	}
	)
	el_ids=src_arr.map(get_ids)
	max_id=new Set(el_ids).size
	let arr=csc.comp.try_compress(el_ids)[1]
	let obj_start={
		id: 0,
		arr_rep: el_ids,
		arr
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(cur)
		let obj=cur
		if(obj.log_val&&comp_res===null) {
			console.log('id:'+obj.id,'[',...obj.log_val,']',obj.stats_win)
		}
		if(cur.stats.length===0) {
			break
		}
		if(cur.stats[0][1]===1) {
			break
		}
		if(cur.next) {
			cur=cur.next
			continue
		} else {
			break
		}
	}
	window.g_obj_arr=flat_obj(obj_start)
}
