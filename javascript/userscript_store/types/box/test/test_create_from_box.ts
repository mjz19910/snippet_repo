import { assert_type } from "../assert_type";
import { Box } from "../Box";
import { Primitives } from "../Primitives";
import { VoidBox } from "../VoidBox";

export namespace test {
	export function test_create_from_box(): void {
	function get_testing_void_box(): Exclude<Box, Primitives | null> | null {
		return new VoidBox;
	}
	let b2 = get_testing_void_box();
	switch (b2) { case null: return; }
	switch (b2.type) {
		case 'array_box': return;
		case 'constructor_box': return;
		case 'custom_box': return;
		case 'document_box': return;
		case 'function_box': return;
		case 'instance_box': return;
		case 'NewableInstancePack<{}>': return;
		case 'object_box': return;
		case 'promise_box': return;
		case 'real_void': return;
		case 'shape_box': return;
		case 'temporary_box': return;
		case 'value_box': return;
		case 'void': return;
		case 'with_properties': return;
		default: assert_type<never>(b2);
	}
}
}