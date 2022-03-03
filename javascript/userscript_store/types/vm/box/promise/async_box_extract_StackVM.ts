import {StackVM} from "../../StackVM";
import {Box} from "../Box";
import {async_box_extract_like_type} from "./async_box_extract_like_type";
import {async_box_no_proto_desc_to_stack_vm_1} from "./async_box_no_proto_desc_to_stack_vm_1";
import {async_box_no_proto_desc_to_stack_vm_2} from "./async_box_no_proto_desc_to_stack_vm_2";
import {async_box_is_stack_vm_prop_desc} from "./async_box_is_stack_vm_prop_desc";
import {async_box_is_array_of} from "./async_box_is_array_of";
import {async_box_force_unsafe_cast} from "./async_box_force_unsafe_cast";

export function async_box_extract_StackVM(value: {} | typeof globalThis | CSSStyleSheetInit | StackVM): value is StackVM {
	let all_prop_desc = Object.getOwnPropertyDescriptors(value);
	if(async_box_no_proto_desc_to_stack_vm_1(all_prop_desc)) {
		return false;
	}
	if(async_box_no_proto_desc_to_stack_vm_2(all_prop_desc)) {
		return false;
	}
	if(async_box_is_stack_vm_prop_desc(all_prop_desc)) {
		let prop_desc_stack = all_prop_desc.stack;
		if(prop_desc_stack.get || prop_desc_stack.set) {
			if(!prop_desc_stack.get) {
				return false;
			}
			try {
				let test_val = prop_desc_stack.get.call(value);
				return async_box_is_array_of(test_val, function(v: Box): v is Box {
					void v;
					return false;
				});
			} catch {
				return false;
			}
		}
		if(async_box_extract_like_type<TypedPropertyDescriptor<Box[]>>(prop_desc_stack)) {
			return true;
		}
		return false;
	}
	let ty_svm = Object.getOwnPropertyDescriptors<StackVM>;
	let ty_glo = Object.getOwnPropertyDescriptors<typeof globalThis>;
	type v_svm = ReturnType<typeof ty_svm>;
	type v_glo = ReturnType<typeof ty_glo>;
	type v_svm_glo = ReturnType<typeof ty_svm> | v_glo;
	type vv1 = Extract<v_svm_glo, v_glo>;
	type vv2 = Extract<v_glo, v_svm_glo>;
	let use_vv2:vv2|null=null;
	/** @type {never} */
	type vv3=Exclude<v_glo, v_svm_glo>;
	let use_vv3:vv3|null=null;
	if(async_box_force_unsafe_cast<typeof globalThis>(value)){
		let as1: vv1 = ty_glo(value);
		/**@type {never} */
		let pd_from_proto: StackVM|null=null;
		void pd_from_proto;
		void as1,use_vv2,use_vv3;
	}
	if(async_box_force_unsafe_cast<StackVM>(value)){
		type vv4 = Exclude<v_svm_glo, v_glo>;
		let as2: vv4 = ty_svm(value);
		type v1 = Exclude<typeof as2, v_svm>;
		let use_v1:v1|null=null;
		void use_v1;
	}
	return false;
}
