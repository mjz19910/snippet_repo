import {async_box_fn_gt_s3, async_box_fn_svm_pd} from "./const";

export function async_box_is_stack_vm_prop_desc(v: ReturnType<typeof async_box_fn_gt_s3>): v is ReturnType<typeof async_box_fn_svm_pd> {
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
