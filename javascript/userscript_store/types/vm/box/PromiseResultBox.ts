import {BoxInner} from "final/BaseBox";
import NewableFactory from "../NewableFactory";
import Primitives from "../Primitives";
import {StackVM} from "../StackVM";
import ArrayBox from "./ArrayBox";
import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import CSSStyleSheetConstructorBox from "./CSSStyleSheetConstructorBox";
import CSSStyleSheetInitBox from "./CSSStyleSheetInitBox";
import EmptyArrayBox from "./EmptyArrayBox";
import FunctionBox from "./FunctionBox";
import GlobalThisBox from "./GlobalThisBox";
import MediaListBox from "./MediaListBox";
import NodeBox from "./NodeBox";
import ObjectBox from "./ObjectBox";
import PromiseBox from "./PromiseBox";
import StackVMBox from "./StackVMBox";
import TemporaryBox from "./TemporaryBox";
import VoidBox from "./VoidBox";
import WindowBox from "./WindowBox";
type UnboxType = Primitives | BoxInner | null;

export default class AsyncFunctionBox extends BoxTemplate<"function_box", (...a: Box[]) => Promise<Box>> {
	type: "function_box" = "function_box";
	return_type: "promise_box" = "promise_box";
	await_type: "Box" = "Box";
	wrap_call(target_this: Box, ...args: Box[]): Box {
		let ret = this.value.apply(target_this, args);
		return new PromiseBox(ret);
	}
}

export function wrap_void_function(value_to_wrap: (this: UnboxType, ...args: UnboxType[]) => void) {
	return function wrap_inner(this_: Box, ...args: Box[]): void {
		let real_args: UnboxType[] = [];
		for(let i = 0;i < args.length;i++) {
			let cur = args[i];
			real_args.push(extract_box_inner_all(cur));
		}
		let real_this: UnboxType;
		if(this_ === null) {
			real_this = this_;
		} else if(typeof this_ === 'object') {
			real_this = this_.value;
		}
		let ret = value_to_wrap.apply(real_this, real_args);
		return ret;
	}
}

function extract_box_inner_all(v: Box): UnboxType {
	let cur = v;
	switch(typeof cur) {
		case 'function': throw new Error("What");
		case 'object': if(cur === null) return cur;
			if(cur.type === 'void') {
				throw new Error("Void in arguments to call");
			}
			if(cur.type === 'function_box') return cur.value;
			if(cur.type === 'array_box') return cur.value;
			if(cur.type === 'constructor_box') return cur.value;
			if(cur.type === 'custom_box') return cur.value;
			if(cur.type === 'instance_box') return cur.value;
			if(cur.type === 'object_box') return cur.value;
			if(cur.type === 'promise_box') return cur.value;
			if(cur.type === 'shape_box') return cur.value;
			if(cur.type === 'value_box') return cur.value;
			throw new Error("Unhandled box in un_box_all");
		case 'bigint':
		case 'boolean':
		case 'number':
		case 'string':
		case 'symbol':
		case 'undefined': return cur;
		default: throw new Error("Unexpected typeof " + (typeof cur));
	}
}

type AllPromiseInBoxType = Promise<CSSStyleSheet> | Promise<void> | Promise<Box>;

function extract_sub_type<T, GeneralType>(v: T | GeneralType): v is T {
	return false;
}

const extract_box_function = extract_sub_type<(...a: Box[]) => Box, Function>;

const extract_constructor_function = extract_sub_type<NewableFactory<{}>, Function>;

function extract_CSSStyleSheetConstructor(v: typeof CSSStyleSheet | Function): v is typeof CSSStyleSheet {
	return false;
}

function create_box(v: UnboxType): Box {
	if(v === void 0) return v;
	let ret = v;
	if(typeof ret === 'bigint') {
		return ret;
	}
	if(typeof ret === 'string') return ret;
	if(typeof ret === 'number') return ret;
	if(typeof ret === 'boolean') return ret;
	if(typeof ret === 'symbol') return ret;
	if(typeof ret === 'function') {
		if(extract_box_function(ret)) {
			return new FunctionBox(ret);
		}
		if(extract_constructor_function(ret)) {
			return new VoidBox;
		}
		if(extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(ret)) {
			ret;
			return new VoidBox;
		}
		let tmp_box: {
			type: 'instance_box';
			value: typeof ret
		} = {
			type: 'instance_box',
			value: ret,
		};
		if(extract_CSSStyleSheetConstructor(ret)) {
			return new CSSStyleSheetConstructorBox(ret);
		};
		let ret_tmp_box:TemporaryBox={
			type: "temporary_box",
			source:"create_box",
			extension:null,
			value: ret
		};
		return ret_tmp_box;
	}
	{
		if(ret === null) return ret;
		if(ret instanceof Array) {
			if(extract_unit_arr(ret)) {
				return new EmptyArrayBox(ret);
			}
			return new ArrayBox(ret);
		}
		if(ret instanceof Promise) {
			let promise_to_box: Promise<Box> = ret.then(function(val: Awaited<AllPromiseInBoxType>): Box {
				if(val === void 0) {
					return new VoidBox();
				} else if(val === null) {
					return (null);
				} else if(val instanceof CSSStyleSheet) {
					return (new CSSStyleSheetBox(val));
				} else if(typeof val === 'object') {
					if(val.type === 'array_box') return val;
					else if(val.type === 'constructor_box') return val;
					else if(val.type === 'custom_box') return val;
					else if(val.type === 'function_box') return val;
					else if(val.type === 'instance_box') return val;
					else if(val.type === 'object_box') return val;
					else if(val.type === 'promise_box') return val;
					else if(val.type === 'shape_box') return val;
					else if(val.type === 'value_box') return val;
					else if(val.type === 'void') return val;
					else {
						console.warn("box type unknown", val);
						throw new Error("Unknown box");
					}
				}
				return val;
			});
			return new PromiseBox(promise_to_box);
		}
		if(ret instanceof Node) return new NodeBox(ret);
		if(ret instanceof CSSStyleSheet) return new CSSStyleSheetBox(ret);
		if(ret instanceof Window) return new WindowBox(ret);
		if(ret instanceof MediaList) return new MediaListBox(ret);
		if(ret instanceof Object) {
			if(extract_StackVM(ret)) return new StackVMBox(ret);
			if(extract_globalThis(ret)) return new GlobalThisBox(ret);
			if(extract_CSSStyleSheetInit(ret)) return new CSSStyleSheetInitBox(ret);
			if(Object.keys(ret).length > 0) {
				console.warn('unable to box', ret);
				throw new Error("Need box for iterable properties of return value");
			}
			return new ObjectBox(ret);
		}
		throw new Error("Never type should not be reached");
	}
}

export function wrap_normal_function(value_to_wrap: {apply: (arg0: UnboxType, arg1: UnboxType[]) => UnboxType}) {
	return function wrap_inner(this_: Box, ...args: Box[]): Box {
		let real_args: UnboxType[] = [];
		for(let i = 0;i < args.length;i++) {
			let cur = args[i];
			real_args.push(extract_box_inner_all(cur));
		}
		let real_this: UnboxType;
		if(this_ === null) {
			real_this = this_;
		} else if(typeof this_ === 'object') {
			real_this = this_.value;
		}
		let ret = value_to_wrap.apply(real_this, real_args);
		return create_box(ret);
	}
}
function extract_like_type<T extends PropertyDescriptor>(value: PropertyDescriptor): value is T {
	if(!value.value) return false;
	// can't check innards
	if(value.value.length === 0) return false;
	let in_type = value.value[0];
	if(is_box(in_type)) {
		return true;
	}
	return false;
}
function is_box<T>(v: T extends Box ? T : never): v is (T extends Box ? T : never) {
	switch(typeof v) {
		default: return true;
	}
}

let fn_gt = Object.getOwnPropertyDescriptors<typeof globalThis>;
let fn_css_ssi = Object.getOwnPropertyDescriptors<CSSStyleSheetInit>;

let fn_gt_s1 = Object.getOwnPropertyDescriptors<typeof globalThis | CSSStyleSheetInit | StackVM | {}>;

let fn_gt_s2 = Object.getOwnPropertyDescriptors<CSSStyleSheetInit | StackVM | {}>;

let fn_gt_s3 = Object.getOwnPropertyDescriptors<StackVM | {}>;

let fn_get_own_prop_desc_svm = Object.getOwnPropertyDescriptors<StackVM>;

function no_proto_desc_to_stack_vm_1(v: ReturnType<typeof fn_gt_s1>): v is ReturnType<typeof fn_gt> {
	return false;
}

function no_proto_desc_to_stack_vm_2(v: ReturnType<typeof fn_gt_s2>): v is ReturnType<typeof fn_css_ssi> {
	return false;
}

function is_stack_vm_prop_desc(v: ReturnType<typeof fn_gt_s3>): v is ReturnType<typeof fn_get_own_prop_desc_svm> {
	if(!v.stack) return false;
	if(!v.push) return false;
	if(!v.pop) return false;
	if(!v.pop_arg_count) return false;
	return true;
}

export function drop_type<T>(v: T): v is T {
	return false;
}

function is_array_of<
	T extends ({[v:string]:any} | Primitives|null)[],
	t_check_fn extends (v: T[0]) => v is T[0]
>(
	// if the type system can figure out the array can never have any values, use this to make it a type error
	v: T extends [] ? never : T,
	// the function the user passes that will check if the contained type is valid
	fn_is_type: t_check_fn
) {
	let vv = v.values();
	let v1 = vv.next();
	if(v1.done) {
		// nothing to check (at runtime)
		return false;
	} else {
		let vv = v1.value;
		return fn_is_type(vv);
	}
}

function extract_StackVM(value: {} | typeof globalThis | CSSStyleSheetInit | StackVM): value is StackVM {
	let ty_svm = Object.getOwnPropertyDescriptors<StackVM>;
	let ty_glo = Object.getOwnPropertyDescriptors<typeof globalThis>;
	let all_prop_desc = Object.getOwnPropertyDescriptors(value);
	if(no_proto_desc_to_stack_vm_1(all_prop_desc)) {
		return false;
	}
	if(no_proto_desc_to_stack_vm_2(all_prop_desc)) {
		return false;
	}
	if(is_stack_vm_prop_desc(all_prop_desc)) {
		let prop_desc_stack = all_prop_desc.stack;
		if(prop_desc_stack.get || prop_desc_stack.set) {
			if(!prop_desc_stack.get) {
				return false;
			}
			try {
				let test_val = prop_desc_stack.get.call(value);
				return is_array_of(test_val, function(v:Box):v is Box {
					void v;
					return false;
				});
			} catch {
				return false
			}
			return false;
		}
		if(extract_like_type<TypedPropertyDescriptor<Box[]>>(prop_desc_stack)) {
			return true;
		}
		return false;
	}
	type v_svm = ReturnType<typeof ty_svm>;
	type v_glo = ReturnType<typeof ty_glo>;
	type v_svm_glo = ReturnType<typeof ty_svm> | v_glo;
	type vv1 = Extract<v_svm_glo, v_glo>;
	type vv2 = Extract<v_glo, v_svm_glo>;
	/** @type {never} */
	// type vv3=Exclude<v_glo, v_svm_glo>;
	type vv4 = Exclude<v_svm_glo, v_glo>;
	let as1: vv1 = ty_glo(value as typeof globalThis);
	let as2: vv4 = ty_svm(value as StackVM);
	/**@type {never} */
	type v1 = Exclude<typeof as2, v_svm>;
	let pd_from_proto: StackVM;
	return false;
}
function extract_globalThis(value: typeof globalThis | CSSStyleSheetInit): value is typeof globalThis {
	let dsc = Object.getOwnPropertyDescriptors(value);
	if(dsc.AbortController) return true;
	if(dsc.Error) return true;
	return false;
}
function extract_CSSStyleSheetInit(value: {} | CSSStyleSheetInit): value is CSSStyleSheetInit {
	let rr = Object.getOwnPropertyDescriptors(value);
	if(rr.baseURL) return true;
	if(rr.disabled) return true;
	if(rr.media) return true;
	return false;
}
function extract_unit_arr(value: [] | Box[]): value is [] {
	if(value.length === 0) {
		return true;
	}
	return false;
}
