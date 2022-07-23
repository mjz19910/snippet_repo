import {StackVM} from "../StackVM";
import {extract_stack_vm_from_obj} from "./extract_stack_vm_from_obj";
export function is_StackVM(value: {} | StackVM): value is StackVM {
	if(extract_stack_vm_from_obj(value)) {
		return true;
	}
	return false;
}
