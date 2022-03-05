import {ArrayBox} from "./ArrayBox";
import {Box} from "./Box";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {FunctionBox} from "./FunctionBox";
import {MediaListBox} from "./MediaListBox";
import {NodeBox} from "./NodeBox";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import {extract_unit_arr} from "./extract_unit_arr";
import {extract_sub_type} from "./extract_sub_type";
import {extract_CSSStyleSheetConstructor} from "./extract_CSSStyleSheetConstructor";
import {BoxExtractType} from "./extract/BoxExtractType";
import {NewableInstancePack} from "./NewableInstancePack";
import {PropertiesToIterate} from "./PropertiesToIterate";
import {create_box_from_obj} from "./create_box_from_obj";
import {temporary_box_from_create_box} from "./temporary_box_from_create_box";
import {is_array_of} from "./is_array_of";
import {is_box} from "./is_box";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox";
import {PromiseBox} from "./mod";
import {async_returns_into_box} from "./async/async_returns_into_box";
import {InstructionType} from "../vm/instruction/mod";
export const PropertiesToIterateArray: PropertiesToIterate[] = ["type"];
export const box_able_properties_cache = new Set<string>();
export type BoxWithPropertiesObjType<T extends string[]>={[U in T[number]]:Box};
function is_instruction_type(value:InstructionType):value is InstructionType {
	switch(value[0]){case 'append':return value.length === 1}
	switch(value[0]){case 'breakpoint':return value.length === 1}
	switch(value[0]){case 'call':return value.length === 2}
	switch(value[0]){case 'cast':return value.length === 2}
	switch(value[0]){case 'construct':return value.length === 2}
	switch(value[0]){case 'drop':return value.length === 1}
	switch(value[0]){case 'dup':return value.length === 1}
	switch(value[0]){case 'get':return value.length === 1}
	switch(value[0]){case 'halt':return value.length === 1}
	switch(value[0]){case 'je':return value.length === 2}
	switch(value[0]){case 'jmp':return value.length === 2}
	switch(value[0]){case 'modify_operand':return value.length === 3}
	switch(value[0]){case 'nop':return value.length === 1}
	switch(value[0]){case 'peek':return value.length === 2}
	switch(value[0]){
		case 'push':
			let [, ...rest]=value;
			rest;
			return true
	}
	switch(value[0]){case 'push_global_object':return value.length === 1}
	switch(value[0]){case 'return':return value.length === 1}
	switch(value[0]){case 'vm_block_trace':return true}
	switch(value[0]){case 'vm_call':return true}
	switch(value[0]){case 'vm_push_args':return value.length === 1}
	switch(value[0]){case 'vm_push_ip':return value.length === 1}
	switch(value[0]){case 'vm_push_self':return value.length === 1}
	switch(value[0]){case 'vm_return':return value.length === 1;default:return false}
}
function is_array_of_box<T>(value:Box[]|T[]):value is Box[] {
	return is_array_of(value, function(inner_value):inner_value is Box {
		return is_box(inner_value);
	});
}
function is_array_of_InstructionType<T>(value:InstructionType[]|T[]):value is InstructionType[] {
	return is_array_of(value, function(inner_value):inner_value is InstructionType {
		return is_box(inner_value);
	})
}
export function create_box(value: BoxExtractType): Box {
	switch(typeof value) {case 'bigint': return value}
	switch(typeof value) {case 'boolean': return value}
	switch(typeof value) {case 'number': return value}
	switch(typeof value) {case 'string': return value}
	switch(typeof value) {case 'symbol': return value}
	switch(typeof value) {case 'undefined': return value}
	if(typeof value === 'function') {
		if(extract_sub_type<(...a: Box[]) => Box, Function>(value)) {
			return new FunctionBox(value);
		}
		if(extract_sub_type<NewableInstancePack<{}>, Function>(value)) {
			return new VoidBox;
		}
		if(extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(value)) {
			return new VoidBox;
		}
		if(extract_CSSStyleSheetConstructor(value)) {
			return new CSSStyleSheetConstructorBox(value);
		}
		return new temporary_box_from_create_box(value);
	}
	{
		if(value === null)
			return value;
		if(value instanceof Array) {
			if(extract_unit_arr(value)) {
				return new EmptyArrayBox(value);
			}
			if(is_array_of_box(value))return new ArrayBox(value);
			if(is_array_of_InstructionType(value))return new InstructionTypeArrayBox(value);
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
			if(value === null)return value;
			return create_box_from_obj(value);
		}
		throw new Error("Never type should not be reached");
	}
}
