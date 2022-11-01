import {Box} from "../Box.js"
import {VoidBox} from "../VoidBox.js"
import {ArrayBox} from "../ArrayBox.js"
import {Primitives} from "../helper/Primitives.js"
import {ExtractKey} from "../ExtractKey.js"

export namespace test {
	export function ExtractKey_test() {
		type Test2=ExtractKey<ArrayBox|VoidBox,'value'>
		type Test3=ExtractKey<Exclude<Box,Primitives>,'value'>
		let vv: Test2=[new VoidBox]
		let vv2: Test3=[[new VoidBox]]
		void vv,vv2
	}
}
