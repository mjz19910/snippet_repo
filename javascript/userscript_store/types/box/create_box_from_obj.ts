import { CSSStyleSheetInitBox } from "./CSSStyleSheetInitBox";
import { ObjectBox } from "./ObjectBox";
import { StackVMBox } from "./StackVMBox";
import { extract_CSSStyleSheetInit } from "./extract_CSSStyleSheetInit";
import { extract_StackVM } from "../vm/box_support/extract_stack_vm";
import { ModifyOperand } from "../vm/instruction/ModifyOperand";
import { Primitives } from "./Primitives";
import { Box } from "./Box";
import { NodeBox } from "./NodeBox";
import { DocumentBox } from "./DocumentBox";
import { WindowBox } from "./WindowBox";
import { CSSStyleSheetBox } from "./CSSStyleSheetBox";
import { EmptyArrayBox } from "./EmptyArrayBox";
import { ArrayBox } from "./ArrayBox";
import { async_convert_to_box } from "./async_convert_to_box";
import { is_empty_arr } from "./is_empty_arr";
import { async_box_extract_globalThis as is_globalThis } from "./extract_globalThis";
import { GlobalThisBox } from "./GlobalThisBox";
import { MediaListBox } from "./MediaListBox";
import { VoidBox } from "./VoidBox";
import { is_array_of } from "./is_array_of";
import { temporary_box_from_create_box_from_obj } from "./temporary_box_from_create_box_from_obj";
import { InstructionTypeArrayBox } from "./InstructionTypeArrayBox";
import { is_box } from "./is_box";
import { DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { assert_type } from "./assert_type";
import { extract_MediaList as is_MediaList } from "./extract_MediaList";
import { ObjectBox_Value } from "./ObjectBox_Value";
import { PromiseBox } from "./promise/PromiseBox";
import { is_node } from "./is_node";
import { is_array } from "./is_array";
import { is_instruction_type } from "./is_instruction_type.1";
export function create_box_from_object(value: ObjectBox_Value): Box {
	if (value === null) return value
	if (value === void 0) return new VoidBox
	if (extract_StackVM(value)) return new StackVMBox(value)
	if (extract_CSSStyleSheetInit(value))return new CSSStyleSheetInitBox(value)
	if (value instanceof Document) return new DocumentBox(value)
	if (is_node(value)) return new NodeBox(value)
	if (value instanceof Window) return new WindowBox(value)
	if (value instanceof CSSStyleSheet) return new CSSStyleSheetBox(value)
	if (is_array<ObjectBox_Value, Extract<typeof value, any[]>>(value)) {
		if (is_empty_arr(value)) return new EmptyArrayBox(value)
		if (is_array_of(value, is_box)) return new ArrayBox(value)
		if (is_array_of(value, is_instruction_type)) return new InstructionTypeArrayBox(value)
	}
	if (value instanceof Promise<any>) return new PromiseBox(async_convert_to_box(value))
	if (is_MediaList(value)) return new MediaListBox(value)
	if (is_globalThis(value)) return new GlobalThisBox(value)
	if (Object.keys(value).length > 0) return new temporary_box_from_create_box_from_obj(value)
	return new ObjectBox(value);
}
export namespace Tests {
	export function tests(): void {
		function get_testing_void_box(): Exclude<Box, Primitives | null> | null {
			return new VoidBox;
		}
		let b2 = get_testing_void_box();
		switch (b2) { case null: return }
		switch (b2.type) {
			case 'array_box': return
			case 'constructor_box': return
			case 'custom_box': return
			case 'document_box': return
			case 'function_box': return
			case 'instance_box': return
			case 'NewableInstancePack<{}>': return
			case 'object_box': return
			case 'promise_box': return
			case 'real_void': return
			case 'shape_box': return
			case 'temporary_box': return
			case 'value_box': return
			case 'void': return
			case 'with_properties': return
			default: assert_type<never>(b2)
		}
	}
}

export function is_instruction_modify_op<T extends Array<any>>(v: T | ModifyOperand): v is ModifyOperand {
	if (
		v.length === 3 &&
		v[0] === 'modify_operand' &&
		typeof v[1] === 'number' &&
		typeof v[2] === 'number'
	) return true;
	return false;
}

export function is_dom_instruction_type(v: DomInstructionType): v is DomInstructionType {
	if (typeof v[0] !== 'number') return false;
	let [, ...instruction_base] = v;
	if (is_instruction_type(instruction_base)) {
		return true;
	} else {
		switch (instruction_base[0]) {
			case 'dom_filter_6': break;
			case 'dom_filter_7': break;
			case 'marker': break;
			case 'vm_call_at': break;
		}
	}
	return false;
}
