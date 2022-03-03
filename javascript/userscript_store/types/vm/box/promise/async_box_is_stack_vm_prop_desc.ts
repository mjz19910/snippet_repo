import {StackVM} from "../../StackVM";

export function async_box_is_stack_vm_prop_desc(v: any): v is StackVM {
	if(!v.stack)
		return false;
	if(!v.push)
		return false;
	if(!v.pop)
		return false;
	if(!v.pop_arg_count)
		return false;
	return true;
}
