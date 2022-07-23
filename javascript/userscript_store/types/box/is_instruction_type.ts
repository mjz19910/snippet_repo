import { InstructionType } from "../vm/instruction/mod";
import { assert_type } from "./assert_type";
import { assume_exclude_type } from "./assume_exclude_type";
import { is_array_of } from "./is_array_of";
import { is_box } from "./is_box";
import { is_empty_arr } from "./is_empty_arr";
import { is_instruction_block_trace } from "./is_instruction_block_trace";
import { is_instruction_modify_op } from "./is_instruction_modify_op";
import { is_number } from "./is_number";

export function is_instruction_type<T extends any[]>(value: T | InstructionType): value is InstructionType {
	if (assume_exclude_type<T>(value)) throw new Error("Never");
	switch (value[0]) {
		case 'push': let [, ...rest] = value;
			if (is_empty_arr(rest)) return true;
			if (is_array_of(rest, is_box)) return true;
			assert_type<never>(rest);
			return false;
		case 'vm_block_trace': return is_instruction_block_trace(value);
	}
	switch (value.length) {
		case 1: switch (value[0]) {
			case 'append': return true;
			case 'breakpoint': return true;
			case 'drop': return true;
			case 'dup': return true;
			case 'get': return true;
			case 'halt': return true;
			case 'nop': return true;
			case 'push_window_object': return true;
			case 'return': return true;
			case 'vm_push_args': return true;
			case 'vm_push_ip': return true;
			case 'vm_push_self': return true;
			case 'vm_return': return true;
			default: assert_type<never>(value); return false;
		}
		case 2: switch (value[0]) {
			case 'construct': break;
			case 'je':
			case 'jmp':
			case 'peek':
			case 'vm_call':
			case 'call': return is_number(value[1])
			case 'cast': switch (value[1]) {
				case 'object_index': return true;
				case 'object_index_to_function': return true;
				case 'vm_function': return true;
			}
			default: assert_type<never>(value); return false;
		} break;
		case 3: switch (value[0]) {
			case 'modify_operand': return is_instruction_modify_op(value);
			case 'vm_block_trace': return is_instruction_block_trace(value);
			default: assert_type<never>(value); return false;
		}
		default: value; return false;
	}
	return false;
}
