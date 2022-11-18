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
	let function_1=Repeat.N.get_map_T(NumType,arr[0]);
	let map_2=function_1<number,number>();
	let map3=Repeat.get_require(map_2,arr[0]);
	if(map3 === null) {
		state.ret.push(new Repeat(arr[0],2));
	}
}
