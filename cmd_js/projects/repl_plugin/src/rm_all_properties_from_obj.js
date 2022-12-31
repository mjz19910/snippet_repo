/**
 * @arg {import("vm").Context} obj
 */
export function rm_all_properties_from_obj(obj) {
	let k_arr
	let cur=obj
	Object.setPrototypeOf(obj,null)
	let desc=Object.getOwnPropertyDescriptors(cur)
	k_arr=Object.keys(desc)
	console.log(k_arr)
	for(let i of k_arr) {
		if(desc[i].configurable) {
			delete obj[i]
		}
	}
	cur=obj
	k_arr=Object.keys(Object.getOwnPropertyDescriptors(cur))
	console.log('after',k_arr)
	obj.rm_all=rm_all_properties_from_obj
}
