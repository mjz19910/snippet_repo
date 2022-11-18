import {TypeAOrTypeB} from "../src/repeat/TypeAOrTypeB";
import {AnyOrRepeat} from "../src/repeat/AnyOrRepeat";

declare global {
	type IDValue=X.IDValue;
}

namespace X {
	export class IDValue {
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
}