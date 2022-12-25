export class IDValue_0 {
	set_arr_T<T extends {}>(arr: T[]) {
		if(arr.length===0)
			throw new Error("Unable to use zero length array");
		let item=arr[0] as any;
		console.log('new_proto_keys',Object.keys(item));
		console.log('new_proto',Object.getPrototypeOf(item));
	}
	id: number;
	next: IDValue_0|null;
	arr_dual: AltPair<string,number>[];
	arr_dual_x: AltPair<AnyOrRepeat_0<string>,AnyOrRepeat_0<number>>[];
	arr_rep_str: AnyOrRepeat_0<string>[];
	arr_rep_num: AnyOrRepeat_0<number>[];
	arr_str: string[];
	arr_num: number[];
	arr_dual_compressed: AnyOrRepeat2_0<string,number>[];
	value: [number,'=',number]|null;
	arr_rep: number[];
	log_val: [number,'=',string,number]|null;
	stats: [string,number][];
	stats_win: number;
	constructor(id: number,next: IDValue_0|null) {
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
