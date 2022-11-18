import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB.js";

declare global {
	type IDValueG=IDValue;
	var IDValueG: typeof IDValue;
}

function assume_is_object<T>(v: {x: {};}|{x: T;}): v is {x: {};} {
	if(v.x) {
		if(Object.getPrototypeOf(v.x)===Object.prototype) {
			return true;
		};
	}
	if(Object.keys(Object.getOwnPropertyDescriptors(v.x)).length===0) {
		return true;
	}
	return false;
}

export class IDValue {
	set_arr_T<T>(arr: T[]) {
		if(arr.length===0) throw new Error("Unable to use zero length array");
		let item=arr[0] as any;
		console.log('new_proto_keys',Object.keys(item));
		console.log('new_proto',Object.getPrototypeOf(item));
	}
	id: number;
	next: IDValue|null;
	arr_dual: TypeAOrTypeB<string,number>[];
	arr_dual_x: TypeAOrTypeB<AnyOrRepeat<string>,AnyOrRepeat<number>>[];
	arr_rep_str: AnyOrRepeat<string>[];
	arr_rep_num: AnyOrRepeat<number>[];
	arr_str: string[];
	arr_num: number[];
	value: [number,'=',number]|null;
	arr_rep: number[];
	log_val: [number,'=',string,number]|null;
	stats: [string,number][];
	stats_win: number;
	constructor(id: number,next: IDValue|null) {
		this.id=id;
		this.next=next;
		this.arr_dual=[];
		this.arr_dual_x=[];
		this.arr_rep_str=[];
		this.arr_rep_num=[];
		this.arr_str=[];
		this.arr_num=[];
		this.value=null;
		this.arr_rep=[];
		this.log_val=null;
		this.stats=[];
		this.stats_win=0;
	}
}