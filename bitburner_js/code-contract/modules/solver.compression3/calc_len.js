/** @arg {LZBufferItem[]} lz_compress_buf */
export function calc_len(lz_compress_buf) {
	let part=lz_compress_buf.find(p => p[1]==="part");
	if(!part) {
		let lz_size=lz_compress_buf.map(e => e[2]);
		return lz_size.reduce((prev,cur) => prev+cur,0);
	}
	let lz_size=lz_compress_buf.map(e => e[1]==="part"? 0:e[2]);
	return lz_size.reduce((prev,cur) => prev+cur,0)+part[2];
}
