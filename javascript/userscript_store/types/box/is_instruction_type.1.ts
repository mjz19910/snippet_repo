import { is_empty_arr } from "./is_empty_arr";
import { is_array_of } from "./is_array_of";
import { InstructionType } from "../vm/instruction/mod";
import { is_box } from "./is_box";
import { is_instruction_block_trace } from "./is_instruction_block_trace";
import { is_instruction_modify_op } from "./create_box_from_obj";

export function is_instruction_type<T>(v: InstructionType | T): v is InstructionType {
	if (!(v instanceof Array))
		return false;
	if (is_instruction_modify_op(v))
		return true;
	if (is_instruction_block_trace(v))
		return true;
	switch (v[0]) {
		case 'push': {
			let [, ...rest] = v;
			if (is_empty_arr(rest))
				return true;
			if (is_array_of(rest, is_box))
				return true;
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
			case 'vm_return': return true;
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
