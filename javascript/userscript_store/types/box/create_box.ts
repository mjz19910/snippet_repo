import {ArrayBox} from "./ArrayBox";
import {async_returns_into_box} from "./async/async_returns_into_box";
import {Box} from "./Box";
import {BoxExtractType} from "./extract/BoxExtractType";
import {create_box_from_obj} from "./create_box_from_obj";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {extract_CSSStyleSheetConstructor} from "./extract_CSSStyleSheetConstructor";
import {extract_sub_type} from "./extract_sub_type";
import {extract_unit_arr} from "./extract_unit_arr";
import {FunctionBox} from "./FunctionBox";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox";
import {MediaListBox} from "./MediaListBox";
import {NewableInstancePack} from "./NewableInstancePack";
import {NodeBox} from "./NodeBox";
import {PromiseBox} from "./mod";
import {PropertiesToIterate} from "./PropertiesToIterate";
import {temporary_box_from_create_box} from "./temporary_box_from_create_box";
import {VoidBox} from "./VoidBox";
import {WindowBox} from "./WindowBox";
import { DomInstructionNullMarker, DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { is_dom_instruction_vm_block_trace } from "./is_dom_instruction_vm_block_trace";
import { is_dom_instruction_tagged_pack } from "./is_dom_instruction_tagged_pack";
import { is_array_of_InstructionType } from "./is_array_of_InstructionType";
import { is_array_of_box } from "./is_array_of_box";
import { is_instruction_type } from "./is_instruction_type";
import { BoxedNewableInstancePackObject } from "./BoxedNewableInstancePackObject";
export const PropertiesToIterateArray: [PropertiesToIterate] = ["type"];
export const box_able_properties_cache = new Set<string>();
export function create_box(value: BoxExtractType): Box {
	switch(typeof value) {case 'bigint': return value}
	switch(typeof value) {case 'boolean': return value}
	switch(typeof value) {case 'number': return value}
	switch(typeof value) {case 'string': return value}
	switch(typeof value) {case 'symbol': return value}
	switch(typeof value) {case 'undefined': return value}
	if(typeof value === 'function') {
		if(extract_CSSStyleSheetConstructor(value)) {
			return new CSSStyleSheetConstructorBox(value);
		}
		if(extract_sub_type<(...a: Box[]) => Box, Function>(value)) {
			return new FunctionBox(value);
		}
		if(extract_sub_type<NewableInstancePack<{}>, Function>(value)) {
			return new BoxedNewableInstancePackObject(value);
		}
		if(extract_sub_type<(...a: Box[]) => Promise<Box>, Function>(value)) {
			return new VoidBox;
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
export function is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if (typeof value[0] !== "number"){
		assert_type<never>(value[0])
		return false;
	}
	switch(value[1]){
		case 'append':return is_instruction_type([value[1]])
		case 'breakpoint':return is_instruction_type([value[1]])
		case 'drop':return is_instruction_type([value[1]])
		case 'dup':return is_instruction_type([value[1]])
		case 'get':return is_instruction_type([value[1]])
		case 'halt':return is_instruction_type([value[1]])
		case 'nop':return is_instruction_type([value[1]])
		case 'return':return is_instruction_type([value[1]])
		case 'push':return is_instruction_type([value[1]])
		case 'vm_push_args':return is_instruction_type([value[1]])
		case 'vm_push_ip':return is_instruction_type([value[1]])
		case 'vm_push_self':return is_instruction_type([value[1]])
	}
	switch(value[1]){
		case 'call':return is_instruction_type([value[1],value[2]])
		case 'cast':return is_instruction_type([value[1],value[2]])
		case 'construct':return is_instruction_type([value[1],value[2]])
		case 'je':return is_instruction_type([value[1],value[2]])
		case 'jmp':return is_instruction_type([value[1],value[2]])
		case 'peek':return is_instruction_type([value[1],value[2]])
	}
	switch(value[1]){case 'vm_call':return is_instruction_type([value[1],value[2]])}
	switch(value[1]){case 'push_global_object':return is_instruction_type(['push_window_object'])}
	switch(value[1]){
		case 'vm_call_at':return value.length === 3 && is_dom_instruction_tagged_pack(value[2]);
		case 'modify_operand':return value.length === 4 && is_instruction_type([value[1],value[2],value[3]])
	}
	switch(value[1]){
		case 'dom_filter_6':switch(value.length){case 6:return true}
		case 'dom_filter_7':switch(value.length){case 7:return true}
	}
	switch(value[1]){
		case 'marker':assert_type<DomInstructionNullMarker>(value);return value.length === 3 && value[2] === null
		case 'vm_block_trace':return is_dom_instruction_vm_block_trace(value);
		case 'vm_return':return value.length === 2;
		default:
			console.log('missing type for dom instruction', [value[1]][0], 'with args=', [value[1]].slice(1))
			throw new Error("Missing type")
	}
}
export function assert_type<T>(value: T) {
	void value;
}
export function is_number(num: number):num is number {
	return typeof num === 'number';
}
