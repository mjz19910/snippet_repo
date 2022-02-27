export function remove_cint_item(cint_arr: [1 | 2, number, string][], cint_item: [1 | 2, number, string]) {
	let idx = cint_arr.indexOf(cint_item);
	cint_arr.splice(idx, 1);
}
