import {calc_compression_opts} from "./calc_compression_opts.js";
import {calc_compression_step1} from "./calc_compression_step1.js";

/**
 * @param {string} str
 * @param {number} start
 * @param {number} len
 * @param {number} next
 * @returns {(["1","part",number,string]|["1","mode-after",number,string])[]}
 */
export function lz_compress_mode1(str,start,len,next) {
	let p1=str.slice(start,start+len);
	let p2=str.slice(start+len+1,next);
	return [['1','part',p1.length,p1],['1',"mode-after",p2.length,p2]];
}

/** @type {Map<string,[null|LZBufferItem[][]]>} */
const many_compress_map=new Map;
/** @arg {string} p1 */
export function get_compressed_opts(p1) {
	/** @type {[null|LZBufferItem[][]]} */
	let before_store;
	x: {
		let map_item=many_compress_map.get(p1);
		if(map_item) {
			before_store=map_item;
			break x;
		}
		before_store=[null];
		many_compress_map.set(p1,before_store);
		let before_opts=calc_compression_opts(p1);
		let r1=before_opts.filter(v => v[0][2]!==p1.length);
		before_store[0]=r1;
	}
	return before_store;
}
/** @arg {LZBufferItem[]} lz_compress_buf */
function calc_len(lz_compress_buf) {
	let part=lz_compress_buf.find(p => p[1]==="part");
	if(!part) {
		let lz_size=lz_compress_buf.map(e => e[2]);
		return lz_size.reduce((prev,cur) => prev+cur,0);
	}
	let lz_size=lz_compress_buf.map(e => e[1]==="part"? 0:e[2]);
	return lz_size.reduce((prev,cur) => prev+cur,0)+part[2];
}

/** @arg {LZBufferItem[][]} arr */
function min_len_sel(arr) {
	if(arr.length===0) throw new Error("Empty");
	return arr.reduce((prev,cur) => {
		let cur_len=calc_len(cur);
		let prev_len=calc_len(prev);
		return cur_len<prev_len? cur:prev;
	});
}


/** @param {LZBufferItem[]} val @arg {any[]} args */
function log_sel(val,...args) {
	console.log(val);
	console.log("length: ",calc_len(val));
	if(args.length>0) console.log(...args);
}
/** @arg {LZBufferItem[]} arr */
function find_part_buf_arr(arr) {
	let item=arr.find((p) => p[1]==="part");
	if(item===void 0) return null;
	if(item[1]!=="part") {
		throw new Error("Unreachable");
	}
	return item;
}
/** @arg {LZBufferItem[][]} arr @arg {number} len */
function compress_set_exclude_len(arr,len) {
	return arr.filter(v => {
		let part=find_part_buf_arr(v);
		if(!part) return true;
		return !part&&part[2]!==len;
	});
}
/** @arg {LZBufferItem[][]} arr @arg {number} len */
function compress_set_extract_len(arr,len) {
	return arr.filter((v) => {
		let part=find_part_buf_arr(v);
		return part&&part[2]===len;
	});
}
/** @template T @arg {T|null} v @returns {v is T} */
function exclude_null(v) {return v!==null;}
/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let sel1=min_len_sel(r1); sel1;
	let r2=compress_set_exclude_len(r1,6);
	let r2_n=compress_set_extract_len(r1,6);
	let r2_part=r2_n.map(v => find_part_buf_arr(v));
	if(r2.length>0) {
		let sel2=min_len_sel(r2); sel2;
		let sel_before=sel2[0];
		let before_compress=sel_before[4];
		if(before_compress) {
			log_sel(sel2,"sel_before: ",before_compress[0]);
		}
		else {throw new Error("TODO");}
	}
	let r2_2=r2_part.filter(exclude_null);
	let part_sel_arr=r2_2.map(v => v[3]);
	let part_uniq=[];
	for(let part of part_sel_arr) {
		if(part_uniq.includes(part)) continue;
		part_uniq.push(part);
	}
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));

export {};