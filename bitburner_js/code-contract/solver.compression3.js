/**
 * @param {string} str
 * @param {number} start
 * @param {number} len
 * @param {number} next
 * @returns {(["1","part",number,string]|["1","mode-after",number,string])[]}
 */
function lz_compress_mode1(str,start,len,next) {
	let p1=str.slice(start,start+len);
	let p2=str.slice(start+len+1,next);
	return [['1','part',p1.length,p1],['1',"mode-after",p2.length,p2]];
}

/** @type {Map<string,[null|LZBufferItem[][]]>} */
const many_compress_map=new Map;
/** @arg {string} p1 */
function get_compressed_opts(p1) {
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
/**
 * @param {string} input
 * @param {string} part
 * @returns {LZBufferItem[]}
 */
function lz_compress1(input,part) {
	if(part.length===0) return [["1","data",input.length,input]];
	let first_idx=input.indexOf(part);
	let next_idx=input.indexOf(part,first_idx+1);
	if(next_idx===-1) return [["1","data",input.length,input]];
	if(first_idx===0) throw new Error();
	let p1=input.slice(0,first_idx);
	let cp_1=lz_compress_mode1(input,first_idx,part.length,next_idx);
	let p3=input.slice(next_idx,next_idx+part.length);
	let p4=input.slice(next_idx+part.length+1);
	/** @type {LZBufferItem[]} */
	let out=[];
	let before_opts=get_compressed_opts(p1);
	out.push(['1','before',p1.length,p1,before_opts[0]]);
	out.push(...cp_1);
	out.push(['1',"part",p3.length,p3]);
	out.push(["1","rest",p4.length,p4]);
	return out;
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
	return arr.reduce((prev,cur) => {
		let cur_len=calc_len(cur);
		let prev_len=calc_len(prev);
		return cur_len<prev_len? cur:prev;
	});
}

/** @arg {string} input */
function calc_compression_opts(input) {
	let len=input.length;
	let all_res=[];
	for(let i=0;i<len;i++) {
		for(let j=0;j<i-1;j++) {
			let part=input.slice(i,i+j);
			all_res.push(lz_compress1(input,part));
		}
	}
	return all_res;
}

/** @typedef {["1","before",number,string,LZBufferItem[][]|null]} LZBeforeItem */
/** @typedef {["1","part",number,string]|["1","mode-after",number,string]|LZBeforeItem|["1","data"|"rest",number,string]} LZBufferItem */

/** @param {LZBufferItem[]} val @arg {any[]} args */
function log_sel(val,...args) {
	console.log(val);
	console.log("length: ",calc_len(val));
	if(args.length>0) console.log(...args);
}
/** @arg {LZBufferItem[]} arr */
function find_part(arr) {
	return arr.find(p => p[1]==="part");
}
/** @arg {LZBufferItem[][]} arr @arg {number} len */
function exclude_len(arr,len) {
	return arr.filter(v => {
		let part=find_part(v);
		if(!part) return true;
		if(part[2]===len) return false;
		return true;
	});
}
/** @arg {string} input */
function calc_compression_step1(input) {
	let all_res=calc_compression_opts(input);
	let r1=all_res.filter(v => v[0][2]!==input.length);
	return r1;
}
/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let sel1=min_len_sel(r1); sel1;
	let r2=exclude_len(r1,6);
	let r2_n=r1.filter(v => {
		let part=find_part(v);
		if(!part) return false;
		return part[2]===6;
	});
	let sel2=min_len_sel(r2); sel2;
	let part_sel_arr=r2_n.map(v => {
		let part=find_part(v);
		if(!part) return null;
		return part[3];
	});
	let part_uniq=[];
	for(let part of part_sel_arr) {
		if(part_uniq.includes(part)) continue;
		part_uniq.push(part);
	}
	let sel_before=sel2[0];
	let before_compress=sel_before[4];
	if(before_compress) {
		log_sel(sel2,"sel_before: ",before_compress[0]);
	}
	else {throw new Error("TODO");}
	return part_uniq[0];
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));

export {};