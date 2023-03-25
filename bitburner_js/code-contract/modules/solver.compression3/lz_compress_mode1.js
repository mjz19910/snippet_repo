import {add_opts_lz_item} from "./add_opts_lz_item";
/**
 * @param {string} str
 * @param {number} start
 * @param {number} len
 * @param {number} next
 */
export function lz_compress_mode1(str,start,len,next) {
	let p1=str.slice(start,start+len);
	let p2=str.slice(start+len+1,next);
	/** @type {(["1","part",number,string]|LZModeAfterItem)[]} */
	let out=[];
	out.push(['1','part',p1.length,p1]);
	add_opts_lz_item(out,"mode-after",p2);
	return out;
}
