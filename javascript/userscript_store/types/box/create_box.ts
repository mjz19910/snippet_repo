import ArrayBox from "./ArrayBox";
import {Box} from "./Box";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import CSSStyleSheetConstructorBox from "./CSSStyleSheetConstructorBox";
import CSSStyleSheetInitBox from "./CSSStyleSheetInitBox";
import EmptyArrayBox from "./EmptyArrayBox";
import FunctionBox from "./FunctionBox";
import GlobalThisBox from "./GlobalThisBox";
import MediaListBox from "./MediaListBox";
import NodeBox from "./NodeBox";
import ObjectBox from "./ObjectBox";
import PromiseBox from "./promise/PromiseBox";
import StackVMBox from "./StackVMBox";
import TemporaryBox from "./TemporaryBox";
import VoidBox from "./VoidBox";
import WindowBox from "./WindowBox";
import {async_box_extract_unit_arr} from "./promise/async_box_extract_unit_arr";
import {async_box_extract_CSSStyleSheetInit} from "./promise/async_box_extract_CSSStyleSheetInit";
import {async_box_extract_globalThis} from "./promise/async_box_extract_globalThis";
import {async_box_extract_StackVM} from "./promise/async_box_extract_StackVM";
import {async_box_extract_sub_type} from "./promise/async_box_extract_sub_type";
import {async_box_extract_CSSStyleSheetConstructor} from "./promise/async_box_extract_CSSStyleSheetConstructor";
import {BoxExtractType} from "./extract/BoxExtractType";
import NewableFactory from "../vm/NewableFactory";
import {async_returns_into_box} from "./async_returns_into_box";
import {has_any_properties_to_box} from "./has_any_properties_to_box";
import {can_property_return_a_box} from "./can_property_return_a_box";
const PropertiesToIterateArray: PropertiesToIterate[] = ["type"];
type PropertiesToIterate = "type";

export const box_able_properties_cache = new Set<string>();

export function create_box(value: BoxExtractType): Box {
	switch(typeof value) {case 'bigint': return value}
	switch(typeof value) {case 'boolean': return value}
	switch(typeof value) {case 'number': return value}
	switch(typeof value) {case 'string': return value}
	switch(typeof value) {case 'symbol': return value}
	switch(typeof value) {case 'undefined': return value}
	if(typeof value === 'function') {
		if(async_box_extract_sub_type<(...a: Box[]) => Box, Function>(value)) {
			return new FunctionBox(value);
		}
		if(async_box_extract_sub_type<NewableFactory<{}>, Function>(value)) {
			return new VoidBox;
		}
		if(async_box_extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(value)) {
			return new VoidBox;
		}
		if(async_box_extract_CSSStyleSheetConstructor(value)) {
			return new CSSStyleSheetConstructorBox(value);
		};
		let ret_tmp_box: TemporaryBox = {
			type: "temporary_box",
			source: "create_box",
			extension: null,
			value: value
		};
		return ret_tmp_box;
	}
	{
		if(value === null)
			return value;
		if(value instanceof Array) {
			if(async_box_extract_unit_arr(value)) {
				return new EmptyArrayBox(value);
			}
			return new ArrayBox(value);
		}
		if(value instanceof Promise) {
			return new PromiseBox(async_returns_into_box(value));
		}
		if(value instanceof Node)
			return new NodeBox(value);
		if(value instanceof CSSStyleSheet)
			return new CSSStyleSheetBox(value);
		if(value instanceof Window)
			return new WindowBox(value);
		if(value instanceof MediaList)
			return new MediaListBox(value);
		if(value instanceof Object) {
			if(async_box_extract_StackVM(value))
				return new StackVMBox(value);
			if(async_box_extract_globalThis(value))
				return new GlobalThisBox(value);
			if(async_box_extract_CSSStyleSheetInit(value))
				return new CSSStyleSheetInitBox(value);
			if(Object.keys(value).length > 0) {
				if(has_any_properties_to_box(value, Object.keys(value))) {
					let iter_arr = PropertiesToIterateArray;
					let res_arr: PropertiesToIterate[] = [];
					for(let i = 0;i < iter_arr.length;i++) {
						if(can_property_return_a_box(value, iter_arr[i])) {
							res_arr.push(iter_arr[i]);
						}
					}
				}
				console.warn('unable to box', value);
				throw new Error("Need box for iterable properties of return value");
			}
			return new ObjectBox(value);
		}
		throw new Error("Never type should not be reached");
	}
}
