/** @arg {LZBufferItem[]} arr */
export function find_part_buf_arr(arr) {
	let item=arr.find((p) => p[1]==="part");
	if(item===void 0)
		return null;
	if(item[1]!=="part") {
		throw new Error("Unreachable");
	}
	return item;
}
