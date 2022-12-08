declare global {
	type IDValue_0=IDValueI;
	var IDValue_0: typeof IDValueI;
}

// ts exports to js
export class IDValueI {
	set_arr_T<T>(arr: T[]) {
		if(arr.length===0) throw new Error("Unable to use zero length array");
		let item=arr[0] as any;
		console.log('new_proto_keys',Object.keys(item));
		console.log('new_proto',Object.getPrototypeOf(item));
	}
	id: number;
	next: IDValueI|null;
	arr_dual: AltPair<string,number>[];
	arr_dual_x: AltPair<AnyOrRepeat_1<string>,AnyOrRepeat_1<number>>[];
	arr_rep_str: AnyOrRepeat_0<string>[];
	arr_rep_num: AnyOrRepeat_1<number>[];
	arr_str: string[];
	arr_num: number[];
	arr_dual_compressed: AnyOrRepeat2_1<string, number>[];
	value: [number,'=',number]|null;
	arr_rep: number[];
	log_val: [number,'=',string,number]|null;
	stats: [string,number][];
	stats_win: number;
	constructor(id: number,next: IDValueI|null) {
		this.id=id;
		this.next=next;
		this.arr_dual=[];
		this.arr_dual_x=[];
		this.arr_rep_str=[];
		this.arr_rep_num=[];
		this.arr_str=[];
		this.arr_num=[];
		this.arr_dual_compressed=[];
		this.value=null;
		this.arr_rep=[];
		this.log_val=null;
		this.stats=[];
		this.stats_win=0;
	}
}
