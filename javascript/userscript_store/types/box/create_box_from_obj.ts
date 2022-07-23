import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox";
import {ObjectBox} from "./ObjectBox";
import {StackVMBox} from "./StackVMBox";
import {extract_CSSStyleSheetInit} from "./extract_CSSStyleSheetInit";
import {extract_StackVM} from "../vm/box_support/extract_stack_vm";
import {ModifyOperand} from "../vm/instruction/ModifyOperand";
import {BoxExtractType} from "./extract/BoxExtractType";
import {Primitives} from "./Primitives";
import {Box} from "./Box";
import {NodeBox} from "./NodeBox";
import {DocumentBox} from "./DocumentBox";
import {WindowBox} from "./WindowBox";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {EmptyArrayBox} from "./EmptyArrayBox";
import {ArrayBox} from "./ArrayBox";
import {async_convert_to_box} from "./async_convert_to_box";
import {create_box_from_obj_with_keys} from "./create_box_from_obj_with_keys";
import {is_empty_arr} from "./is_empty_arr";
import {async_box_extract_globalThis as extract_globalThis} from "./extract_globalThis";
import {GlobalThisBox} from "./GlobalThisBox";
import {MediaListBox} from "./MediaListBox";
import {PromiseBox} from "./mod";
import {VoidBox} from "./VoidBox";
import {BoxWithPropertiesIsBox} from "./BoxWithPropertiesIsBox";
import {is_array_of} from "./is_array_of";
import {InstructionType} from "../vm/instruction/mod";
import {temporary_box_from_create_box_from_obj} from "./temporary_box_from_create_box_from_obj";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox";
import {is_box} from "./is_box";
import {BlockTrace, DomTaggedPack, DomInstructionType} from "../vm/instruction/vm/VMBlockTrace";
type BoxWithObjectValue = Exclude<BoxExtractType, Primitives | Function | undefined | null>;
function extract_MediaList(v: {} | MediaList): v is MediaList {
	console.log('TODO extract MediaList', v);
	return false;
}
export function create_box_from_obj(value: BoxWithObjectValue): Box {
	if(value === void 0) {
		return new VoidBox;
	}
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
		if(is_empty_arr(value)) return new EmptyArrayBox(value);
		if(is_array_of(value, is_box)) return new ArrayBox(value);
		if(is_array_of(value, is_instruction_type)) return new InstructionTypeArrayBox(value);
	}
	if(value instanceof Promise<any>) return new PromiseBox(async_convert_to_box(value));
	if(extract_MediaList(value)) return new MediaListBox(value);
	if(extract_globalThis(value)) return new GlobalThisBox(value);
	if(Object.keys(value).length > 0) return new temporary_box_from_create_box_from_obj(value);
	return new ObjectBox(value);
}
export namespace Tests {
	export function tests(): BoxWithPropertiesIsBox | Box | void | undefined {
		let bx: Exclude<Box, Primitives | null> | null = new VoidBox;
		function get_it(): Exclude<Box, Primitives | null> | null {
			return bx;
		}
		let b2 = get_it();
		switch(b2) {
			case null: {
				let res = create_box_from_obj_with_keys<{}>({});
				return res;
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
		switch(b2.type) {case 'real_void': {b2.value; return } }
		let last: BoxWithPropertiesIsBox = b2;
		switch(b2.type) {case 'with_properties': {b2.value; return last} }
	}
}

function is_ins_modify_op<T>(v: T | ModifyOperand): v is ModifyOperand {
	if(
		v instanceof Array &&
		v[0] === 'modify_operand' &&
		typeof v[1] === 'number' && typeof v[2] === 'number'
	) return true;
	return false;
}

function is_dom_instruction_type(v: DomInstructionType): v is DomInstructionType {
	if(typeof v[0] !== 'number') return false;
	let [, ...instruction_base] = v;
	if(is_instruction_type(instruction_base)) {
		return true;
	} else {
		switch(instruction_base[0]){
			case 'dom_filter':break;
			case 'marker':break;
			case 'vm_call_at':break;
		}
	}
	return false;
}

function is_null<T>(v: T | null): v is null {
	return v === null;
}

function is_DomInstructionTaggedTypePack(v: DomTaggedPack): v is DomTaggedPack {
	switch(v[0]) {
		case 'dom': {
			v;
		} break;
		case 'dom_mem':
		case 'vm':
	}
	return false;
}

function is_ins_block_trace<T>(v: T | BlockTrace): v is BlockTrace {
	if(v instanceof Array) {
		switch(v[0]) {
			case 'vm_block_trace': {
				if(typeof v[1] === 'number') return typeof v[2] === 'number';
				switch(v[1]) {
					case 'begin': {
						let vv = v[2];
						if(is_null(vv)) return true;
						if(is_dom_instruction_type(vv)) {
							return true;
						}
					} break;
					case 'call': {
						let vv = v[2];
						if(is_null(vv)) return true;
						if(is_dom_instruction_type(vv)) {
							return true;
						}
					} break;
					case 'tagged': {
						let vv = v[2];
						if(is_null<typeof vv>(vv)) return true;
						if(is_DomInstructionTaggedTypePack(vv)) return true;
					} break;
					case 'tagged_begin': {
						let vv = v[2];
						if(is_null<typeof vv>(vv)) return true;
						if(is_DomInstructionTaggedTypePack(vv)) {
							return true;
						}
					} break;
					case 'tagged_call': {
						let vv = v[2];
						if(is_null<typeof vv>(vv)) return true;
						if(is_DomInstructionTaggedTypePack(vv)) {
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
	if(!(v instanceof Array)) return false;
	if(is_ins_modify_op(v)) return true;
	if(is_ins_block_trace(v)) return true;
	switch(v[0]) {
		case 'push': {
			let [, ...rest] = v;
			if(is_empty_arr(rest)) return true;
			if(is_array_of(rest, is_box)) return true;
			return false;
		}
	}
	switch(v.length) {
		case 1: switch(v[0]) {
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
	switch(v.length) {
		case 2: {
			let v2;
			switch(v[0]) {
				case 'construct':
				case 'je':
				case 'jmp':
				case 'peek':
				case 'vm_call':
				case 'call': [, v2] = v; return typeof v2 === 'number';
			}
		}
	}
	if(v[0] !== 'cast') {
		return false;
	}
	switch(v[1]) {
		case 'object_index': return true;
		case 'object_index_to_function': return true;
		case 'vm_function': return true;
	}
}
