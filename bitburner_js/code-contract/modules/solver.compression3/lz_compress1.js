import {add_opts_lz_item} from "./add_opts_lz_item.js";
import {lz_compress_mode1} from "./lz_compress_mode1.js";

/** @param {string} input @param {string} part @returns {LZBufferItem[]} */
export function lz_compress1(input,part) {
	if(part.length===0)
		return [["1","data",input.length,input]];
	let first_idx=input.indexOf(part);
	let next_idx=input.indexOf(part,first_idx+1);
	if(next_idx===-1) return [["1","data",input.length,input]];
	/** @type {LZBufferItem[]} */
	let out=[];
	if(first_idx===0) {
		let cp_1=lz_compress_mode1(input,first_idx,part.length,next_idx);
		let p3=input.slice(next_idx,next_idx+part.length);
		let p4=input.slice(next_idx+part.length+1);
		/** @type {LZBufferItem[]} */
		let out=[];
		out.push(...cp_1);
		out.push(['1',"part",p3.length,p3]);
		add_opts_lz_item(out,"rest",p4);
	} else {
		let p1=input.slice(0,first_idx);
		let cp_1=lz_compress_mode1(input,first_idx,part.length,next_idx);
		let p3=input.slice(next_idx,next_idx+part.length);
		let p4=input.slice(next_idx+part.length+1);
		add_opts_lz_item(out,"before",p1);
		out.push(...cp_1);
		out.push(['1',"part",p3.length,p3]);
		add_opts_lz_item(out,"rest",p4);
	}
	return out;
}
