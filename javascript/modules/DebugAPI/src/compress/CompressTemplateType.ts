import {Repeat} from "../repeat/Repeat.js";
import {ConstructorWithSymbolType} from "../repeat/ConstructorWithSymbolType.js";
import {AnyOrRepeat} from "../repeat/AnyOrRepeat.js";
import {BaseCompression} from "./BaseCompression.js";
import {CompressState} from "./CompressState.js";

export class CompressTemplateType {
	try_compress_T<U extends ConstructorWithSymbolType,T extends InstanceType<U>>(arr: T[],constructor_key: U): [true,AnyOrRepeat<T>[]]|[false,T[]] {
		let state: CompressState<T,AnyOrRepeat<T>>=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item,constructor_key);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state(state);
	}
	compress_rle_T_X<U extends ConstructorWithSymbolType,T extends InstanceType<U>>(state: CompressState<T,AnyOrRepeat<T>>,item: T,constructor_key: U) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		let mp=Repeat.N.get_map_T(constructor_key,item);
		Repeat.get_with(mp,item,off);
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}
}
