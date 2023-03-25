import {lz_compress_mode1,get_compressed_opts} from "./mod.js";

/** @param {string} input @param {string} part @returns {LZBufferItem[]} */
export function lz_compress1(input,part) {
	if(part.length===0)
		return [["1","data",input.length,input]];
	let first_idx=input.indexOf(part);
	let next_idx=input.indexOf(part,first_idx+1);
	if(next_idx===-1)
		return [["1","data",input.length,input]];
	if(first_idx===0)
		throw new Error();
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
