import {BaseCompression} from "../../../src/compression/BaseCompression";
import {AltPair} from "../../rebuild_the_universe/AltPair";
import {DualR} from "./DualR";
type AnyOrRepeat2<T,U>=[T,U];
export class CompressDual {
	i: number=0;
	ret: AnyOrRepeat2<string,number>[]=[];
	m_base=new BaseCompression;
	try_compress_dual(): DualR {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return this.m_base.compress_result_state_dual(this);
	}
	compress_rle_TU_to_TX(item: AltPair<string,number>) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(item);
		this.i+=off-1;
		return true;
	}
	constructor(public arr: AltPair<string,number>[]) {}
}
