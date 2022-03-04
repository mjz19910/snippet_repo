import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox";
import {ObjectBox} from "./ObjectBox";
import {StackVMBox} from "./StackVMBox";
import {extract_CSSStyleSheetInit} from "./extract_CSSStyleSheetInit";
import {extract_StackVM} from "../vm/box_support/extract_stack_vm";
import {BoxExtractType} from "./extract/BoxExtractType";
import {Primitives} from "./Primitives";
import Box from "./Box";
import NodeBox from "./NodeBox";
import DocumentBox from "./DocumentBox";
import WindowBox from "./WindowBox";
import CSSStyleSheetBox from "./CSSStyleSheetBox";
import EmptyArrayBox from "./EmptyArrayBox";
import ArrayBox from "./ArrayBox";
import {async_convert_to_box} from "./async_convert_to_box";
import {create_box_from_obj_with_keys} from "./create_box_from_obj_with_keys";
import {is_empty_arr} from "./is_empty_arr";
import {async_box_extract_globalThis} from "./extract_globalThis";
import GlobalThisBox from "./GlobalThisBox";
import MediaListBox from "./MediaListBox";
import {PromiseBox} from "./mod";
import VoidBox from "./VoidBox";
import TemporaryBox from "./TemporaryBox";
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox";
import {FunctionConstructorBox} from "./FunctionConstructorBox";
function extract_MediaList(v: {} | MediaList): v is MediaList {
	console.log('TODO extract MediaList', v);
	return false;
}
export function create_box_from_obj(value: Exclude<BoxExtractType, Primitives | Function | undefined | null>): Box {
	if(extract_StackVM(value)) {
		return new StackVMBox(value);
	}
	if(extract_CSSStyleSheetInit(value)) {
		return new CSSStyleSheetInitBox(value);
	}
	if(value instanceof Document) {
		return new DocumentBox(value);
	}
	if(value instanceof Node) {
		return new NodeBox(value);
	}
	if(value instanceof Window) {
		return new WindowBox(value);
	}
	if(value instanceof CSSStyleSheet) {
		return new CSSStyleSheetBox(value);
	}
	if(value instanceof Array<any>) {
		if(is_empty_arr(value)) {
			return new EmptyArrayBox(value);
		}
		return new ArrayBox(value);
	}
	if(value instanceof Promise<any>) {
		return new PromiseBox(async_convert_to_box(value));
	}
	if(extract_MediaList(value)) {
		return new MediaListBox(value);
	}
	if(async_box_extract_globalThis(value)) {
		return new GlobalThisBox(value);
	}
	if(Object.keys(value).length > 0) {
		let tb: TemporaryBox = {
			type: 'temporary_box',
			extension: 'create_box',
			custom_type: 'box',
			source: "create_box_from_obj",
			value
		};
		return tb;
	}
	return new ObjectBox(value);
}
export namespace Tests {
	export function tests():BoxWithPropertiesIsBox|void|undefined {
		let bx: Exclude<Box, Primitives | null> | null = new VoidBox;
		function get_it(): Exclude<Box, Primitives | null> | null {
			return bx;
		}
		let b2 = get_it();
		switch(b2) {
			case null: {
				return create_box_from_obj_with_keys<{}>({});
			}
		}
		switch(b2.type) {case 'array_box': {b2.value; return } }
		switch(b2.type) {case 'constructor_box': {b2.value; return } }
		switch(b2.type) {case 'custom_box': {b2.value; return } }
		switch(b2.type) {case 'document_box': {b2.value; return } }
		switch(b2.type) {case 'function_box': {b2.value; return } }
		switch(b2.type) {case 'instance_box': {b2.value; return } }
		switch(b2.type) {case 'object_box': {b2.value; return } }
		switch(b2.type) {case 'promise_box': {b2.value; return } }
		switch(b2.type) {case 'shape_box': {b2.value; return } }
		switch(b2.type) {case 'temporary_box': {b2.value; return } }
		switch(b2.type) {case 'value_box': {b2.value; return } }
		switch(b2.type) {case 'void': {b2.value; return } }
		let last:BoxWithPropertiesIsBox=b2;
		switch(b2.type) {case 'with_properties': {b2.value; return last} }
	}
}