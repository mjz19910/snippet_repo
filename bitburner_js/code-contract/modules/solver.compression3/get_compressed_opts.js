import {calc_compression_opts} from "./calc_compression_opts.js";

/** @type {Map<string,[null|LZBufferItem[][]]>} */
export const many_compress_map=new Map;

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
