import {StackVM} from "../../StackVM";
import {async_box_no_proto_desc_to_stack_vm_1} from "./async_box_no_proto_desc_to_stack_vm_1";
export function async_box_extract_StackVM(value: {} | typeof globalThis | CSSStyleSheetInit | StackVM): value is StackVM {
	if(async_box_no_proto_desc_to_stack_vm_1(value)) {
		return true;
	}
	return false;
}
