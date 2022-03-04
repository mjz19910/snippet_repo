import {StackVM} from "../vm/StackVM";
export function extract_stack_vm_from_obj(v: {}|null): v is StackVM {
	if(v === null)return false;
	return true;
};
