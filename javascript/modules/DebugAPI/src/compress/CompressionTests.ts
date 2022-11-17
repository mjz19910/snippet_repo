import {NumType} from "../NumType.js";
import {AnyOrRepeat} from "../repeat/AnyOrRepeat.js";
import {Repeat} from "../repeat/Repeat.js";
import {CompressState} from "./CompressState.js";
import {MulCompression} from "./MulCompression.js";

export function test_try_compress(target: MulCompression) {
	let arr=[0,0,3,3,1,3,1,8];
	target.try_compress_T(arr,NumType);
	let state=new CompressState<number,AnyOrRepeat<number>>(arr);
	target.compress_rle_T_X(state,arr[0],NumType);
	let compression_map=Repeat.N.get_map_T(NumType,arr[0]);
	Repeat.get_with(compression_map,arr[0],2);
	state.ret.push(new Repeat(arr[0],2));
}
