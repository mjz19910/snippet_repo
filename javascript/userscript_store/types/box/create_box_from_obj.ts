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
import { async_box_extract_globalThis as extract_globalThis } from "./extract_globalThis";
import { GlobalThisBox } from "./GlobalThisBox";
import { MediaListBox } from "./MediaListBox";
import { VoidBox } from "./VoidBox";
import { is_array_of } from "./is_array_of";
import { InstructionType } from "../vm/instruction/mod";
import { temporary_box_from_create_box_from_obj } from "./temporary_box_from_create_box_from_obj";
import { InstructionTypeArrayBox } from "./InstructionTypeArrayBox";
import { is_box } from "./is_box";
import { BlockTrace, DomTaggedPack, DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { assert_type } from "./assert_type";
import { extract_MediaList } from "./extract_MediaList";
import { ObjectBox_Value } from "./ObjectBox_Value";
import { PromiseBox } from "./promise/PromiseBox";
import { is_node } from "./is_node";
import { is_array } from "./is_array";
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
	if (extract_MediaList(value)) return new MediaListBox(value)
	if (extract_globalThis(value)) return new GlobalThisBox(value)
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

function is_ins_modify_op<T extends Array<any>>(v: T | ModifyOperand): v is ModifyOperand {
	if (
		v.length === 3 &&
		v[0] === 'modify_operand' &&
		typeof v[1] === 'number' &&
		typeof v[2] === 'number'
	) return true;
	return false;
}

function is_dom_instruction_type(v: DomInstructionType): v is DomInstructionType {
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

function is_null<T>(v: T | null): v is null {
	return v === null;
}

function is_DomInstructionTaggedTypePack(v: DomTaggedPack): v is DomTaggedPack {
	switch (v[0]) {
		case 'dom': {
			v;
		} break;
		case 'dom_mem':
		case 'vm':
	}
	return false;
}

function is_ins_block_trace<T>(v: T | BlockTrace): v is BlockTrace {
	if (v instanceof Array) {
		switch (v[0]) {
			case 'vm_block_trace': {
				if (typeof v[1] === 'number') return typeof v[2] === 'number';
				switch (v[1]) {
					case 'begin': {
						let vv = v[2];
						if (is_null(vv)) return true;
						if (is_dom_instruction_type(vv)) {
							return true;
						}
					} break;
					case 'call': {
						let vv = v[2];
						if (is_null(vv)) return true;
						if (is_dom_instruction_type(vv)) {
							return true;
						}
					} break;
					case 'tagged': {
						let vv = v[2];
						if (is_null<typeof vv>(vv)) return true;
						if (is_DomInstructionTaggedTypePack(vv)) return true;
					} break;
					case 'tagged_begin': {
						let vv = v[2];
						if (is_null<typeof vv>(vv)) return true;
						if (is_DomInstructionTaggedTypePack(vv)) {
							return true;
						}
					} break;
					case 'tagged_call': {
						let vv = v[2];
						if (is_null<typeof vv>(vv)) return true;
						if (is_DomInstructionTaggedTypePack(vv)) {
							return true;
						}
					} break;
				}
			}
		}
	}
	return false;
}

function is_instruction_type<T>(v: InstructionType | T): v is InstructionType {
	if (!(v instanceof Array)) return false;
	if (is_ins_modify_op(v)) return true;
	if (is_ins_block_trace(v)) return true;
	switch (v[0]) {
		case 'push': {
			let [, ...rest] = v;
			if (is_empty_arr(rest)) return true;
			if (is_array_of(rest, is_box)) return true;
			return false;
		}
	}
	switch (v.length) {
		case 1: switch (v[0]) {
			case 'append':
			case 'breakpoint':
			case 'drop':
			case 'dup':
			case 'get':
			case 'halt':
			case 'nop':
			case 'push_window_object':
			case 'return':
			case 'vm_push_args':
			case 'vm_push_ip':
			case 'vm_push_self':
			case 'vm_return': return true
		}
	}
	switch (v.length) {
		case 2: {
			let v2;
			switch (v[0]) {
				case 'construct':
				case 'je':
				case 'jmp':
				case 'peek':
				case 'vm_call':
				case 'call': [, v2] = v; return typeof v2 === 'number';
			}
		}
	}
	if (v[0] !== 'cast') {
		return false;
	}
	switch (v[1]) {
		case 'object_index': return true;
		case 'object_index_to_function': return true;
		case 'vm_function': return true;
	}
}
