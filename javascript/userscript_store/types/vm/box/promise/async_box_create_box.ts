import ArrayBox from "../ArrayBox";
import {Box} from "../Box";
import CSSStyleSheetBox from "../CSSStyleSheetBox";
import CSSStyleSheetConstructorBox from "../CSSStyleSheetConstructorBox";
import CSSStyleSheetInitBox from "../CSSStyleSheetInitBox";
import EmptyArrayBox from "../EmptyArrayBox";
import FunctionBox from "../FunctionBox";
import GlobalThisBox from "../GlobalThisBox";
import MediaListBox from "../MediaListBox";
import NodeBox from "../NodeBox";
import ObjectBox from "../ObjectBox";
import PromiseBox from "./PromiseBox";
import StackVMBox from "../StackVMBox";
import TemporaryBox from "../TemporaryBox";
import VoidBox from "../VoidBox";
import WindowBox from "../WindowBox";
import {async_box_extract_unit_arr} from "./async_box_extract_unit_arr";
import {async_box_extract_CSSStyleSheetInit} from "./async_box_extract_CSSStyleSheetInit";
import {async_box_extract_globalThis} from "./async_box_extract_globalThis";
import {async_box_extract_StackVM} from "./async_box_extract_StackVM";
import {AllPromiseInBoxType} from "./AllPromiseInBoxType";
import {async_box_extract_sub_type} from "./async_box_extract_sub_type";
import {async_box_extract_CSSStyleSheetConstructor} from "./async_box_extract_CSSStyleSheetConstructor";
import {UnboxType} from "./AsyncFunctionBox";
import NewableFactory from "../../NewableFactory";


export function async_box_create_box(v: UnboxType): Box {
	if(v === void 0)
		return v;
	let ret = v;
	if(typeof ret === 'bigint') {
		return ret;
	}
	if(typeof ret === 'string')
		return ret;
	if(typeof ret === 'number')
		return ret;
	if(typeof ret === 'boolean')
		return ret;
	if(typeof ret === 'symbol')
		return ret;
	if(typeof ret === 'function') {
		if(async_box_extract_sub_type<(...a: Box[]) => Box, Function>(ret)) {
			return new FunctionBox(ret);
		}
		if(async_box_extract_sub_type<NewableFactory<{}>, Function>(ret)) {
			return new VoidBox;
		}
		if(async_box_extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(ret)) {
			ret;
			return new VoidBox;
		}
		if(async_box_extract_CSSStyleSheetConstructor(ret)) {
			return new CSSStyleSheetConstructorBox(ret);
		};
		let ret_tmp_box: TemporaryBox = {
			type: "temporary_box",
			source: "create_box",
			extension: null,
			value: ret
		};
		return ret_tmp_box;
	}
	{
		if(ret === null)
			return ret;
		if(ret instanceof Array) {
			if(async_box_extract_unit_arr(ret)) {
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
					if(val.type === 'array_box')
						return val;
					else if(val.type === 'constructor_box')
						return val;
					else if(val.type === 'custom_box')
						return val;
					else if(val.type === 'function_box')
						return val;
					else if(val.type === 'instance_box')
						return val;
					else if(val.type === 'object_box')
						return val;
					else if(val.type === 'promise_box')
						return val;
					else if(val.type === 'shape_box')
						return val;
					else if(val.type === 'value_box')
						return val;
					else if(val.type === 'void')
						return val;
					else {
						console.warn("box type unknown", val);
						throw new Error("Unknown box");
					}
				}
				return val;
			});
			return new PromiseBox(promise_to_box);
		}
		if(ret instanceof Node)
			return new NodeBox(ret);
		if(ret instanceof CSSStyleSheet)
			return new CSSStyleSheetBox(ret);
		if(ret instanceof Window)
			return new WindowBox(ret);
		if(ret instanceof MediaList)
			return new MediaListBox(ret);
		if(ret instanceof Object) {
			if(async_box_extract_StackVM(ret))
				return new StackVMBox(ret);
			if(async_box_extract_globalThis(ret))
				return new GlobalThisBox(ret);
			if(async_box_extract_CSSStyleSheetInit(ret))
				return new CSSStyleSheetInitBox(ret);
			if(Object.keys(ret).length > 0) {
				console.warn('unable to box', ret);
				throw new Error("Need box for iterable properties of return value");
			}
			return new ObjectBox(ret);
		}
		throw new Error("Never type should not be reached");
	}
}
