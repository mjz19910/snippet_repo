import {Box} from "../Box.js"
import {Primitives} from "../helper/Primitives.js"
import {VoidBox} from "../VoidBox.js"
import {assume_is_never} from "../helper/assume_is_never.js"

export namespace test {
	function get_testing_void_box(): Exclude<Box,Primitives|null>|null {
		return new VoidBox
	}
	let b2=get_testing_void_box()
	export function test_create_from_box(): boolean {
		switch(b2) {case null: return true}
		switch(b2.type) {
			case 'array_box': return true
			case 'constructor_box': return true
			case 'custom_box': return true
			case 'document_box': return true
			case 'function_box': return true
			case 'instance_box': return true
			case 'NewableInstancePack<{}>': return true
			case 'object_box': return true
			case 'promise_box': return true
			case 'real_void': return true
			case 'shape_box': return true
			case 'temporary_box': return true
			case 'value_box': return true
			case 'void': return true
			case 'with_properties': return true
			default: return assume_is_never(b2)
		}
	}
}
