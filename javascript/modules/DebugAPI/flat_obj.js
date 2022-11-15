/**
 * @param {{ id?: number; arr_rep?: any; arr?: boolean | string[]; next?: any; }} obj
 */
function flat_obj(obj) {
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		obj=next;
	}
	ret.push(obj);
	return ret;
}
