import {StackVM} from "../vm/StackVM";
import {extract_stack_vm_from_obj} from "./extract_stack_vm_from_obj";
export function async_box_extract_StackVM(value: {} | typeof globalThis | CSSStyleSheetInit | StackVM): value is StackVM {
	if(extract_stack_vm_from_obj(value)) {
		return true;
	}
	return false;
}
