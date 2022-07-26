import {Box} from "../Box"
import {VoidBox} from "../VoidBox"
import {ArrayBox} from "../ArrayBox"
import {Primitives} from "../helper/Primitives"
import {ExtractKey} from "../ExtractKey"

export function ExtractKey_test() {
	type Test2=ExtractKey<ArrayBox|VoidBox,'value'>
	type Test3=ExtractKey<Exclude<Box,Primitives>,'value'>
	let vv: Test2=[new VoidBox]
	let vv2: Test3=[[new VoidBox]]
	void vv,vv2
}
