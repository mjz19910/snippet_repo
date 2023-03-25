import {get_compressed_opts} from "./get_compressed_opts.js";

/** @arg {LZBufferItem[]} out @arg {"rest"|"before"} type @arg {string} p4 */
export function add_opts_lz_item(out,type,p4) {
	let [rest_opts]=get_compressed_opts(p4);
	out.push(["1",type,p4.length,p4,rest_opts]);
}
