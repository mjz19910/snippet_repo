import {IDValueData} from "./IDValueData";

/** @param {IDValueData} obj */
export function flat_obj(obj) {
	/**@type {IValue[]} */
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		if(!(next instanceof IDValueData)) throw new Error("Unexpected type");
		obj=next;
	}
	ret.push(obj);
	return ret;
}
