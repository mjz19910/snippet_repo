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
