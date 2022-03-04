import {ArrayBox} from "./ArrayBox";
import {Box} from "./Box";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {FunctionBox} from "./FunctionBox";
import {MediaListBox} from "./MediaListBox";
import {NodeBox} from "./NodeBox";
import {PromiseBox} from "./promise/PromiseBox";
import {TemporaryBox} from "./TemporaryBox";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import {async_box_extract_unit_arr} from "./extract_unit_arr";
import {async_box_extract_sub_type} from "./extract_sub_type";
import {async_box_extract_CSSStyleSheetConstructor} from "./extract_CSSStyleSheetConstructor";
import {BoxExtractType} from "./extract/BoxExtractType";
import {NewableInstancePack} from "./NewableInstancePack";
import {async_returns_into_box} from "./async_returns_into_box";
import {PropertiesToIterate} from "./PropertiesToIterate";
import {create_box_from_obj} from "./create_box_from_obj";
export const PropertiesToIterateArray: PropertiesToIterate[] = ["type"];
export const box_able_properties_cache = new Set<string>();

export type BoxWithPropertiesObjType<T extends string[]>={[U in T[number]]:Box};

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
		if(async_box_extract_sub_type<NewableInstancePack<{}>, Function>(value)) {
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
			// TODO
			// return new PromiseBox(async_returns_into_box(value));
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
			if(value === null)return value;
			return create_box_from_obj(value);
		}
		throw new Error("Never type should not be reached");
	}
}
