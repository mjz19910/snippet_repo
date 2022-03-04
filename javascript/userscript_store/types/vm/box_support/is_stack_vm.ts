import {StackVM} from "../StackVM";
import {extract_stack_vm_from_obj} from "./extract_stack_vm_from_obj";
export function convert_any_to_stack_vm(v: {}): v is StackVM {
	if(extract_stack_vm_from_obj(v)){
		if(!v.stack)
			return false;
		if(!v.pop_arg_count)
			return false;
		return true;
	}
	return false;
}
