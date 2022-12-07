import {NumType} from "../src/NumType.js";
import {CompressState} from "../src/compress/CompressState.js";
import {MulCompression} from "../src/compress/MulCompression.js";
import {Repeat_1} from "./repeat/Repeat_1.js";

export function test_try_compress(target: MulCompression) {
	let arr=[0,0,3,3,1,3,1,8];
	target.try_compress_T(arr);
	let state=new CompressState<number,AnyOrRepeat_1<number>>(arr);
	target.compress_rle_T_X(state,arr[0]);
	let value_map_map=Repeat_1.N.get_map_T(NumType,arr[0]);
	let value_map=value_map_map<RecordKey<symbol>>(NumType);
	console.log("value_map", value_map);
	state.ret.push(new Repeat_1(arr[0],2));
}
