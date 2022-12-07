/** @param {IDValue} obj */
export function flat_obj(obj) {
	/**@type {IDValue[]} */
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		if(!(next instanceof IDValue_0)) throw new Error("Unexpected type");
		obj=next;
	}
	ret.push(obj);
	return ret;
}
