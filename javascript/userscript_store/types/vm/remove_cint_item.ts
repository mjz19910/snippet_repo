export function remove_cint_item(cint_arr: any[],cint_item: undefined) {
	let idx=cint_arr.indexOf(cint_item)
	cint_arr.splice(idx,1)
}
