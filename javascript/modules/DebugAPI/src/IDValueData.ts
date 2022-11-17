import {TypeAOrTypeB} from "./repeat/TypeAOrTypeB";
import {AnyOrRepeat} from "./repeat/AnyOrRepeat";
import {IDValueBase} from "./IDValueBase";


export class IDValueData extends IDValueBase {
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
	constructor(id: number,next: IDValueBase|null) {
		super(id,next);
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
