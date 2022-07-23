import { DomInstructionBlockTrace } from "../vm/instruction/vm/VMBlockTrace";
import { is_number } from "./is_number";
import { assert_type } from "./assert_type";
import { is_dom_instruction_type } from "./is_dom_instruction_type";
import { is_dom_instruction_tagged_pack } from "./is_dom_instruction_tagged_pack";

export function is_dom_instruction_vm_block_trace(value: DomInstructionBlockTrace): value is DomInstructionBlockTrace {
	switch (value[2]) {
		case 'call':
		case 'begin': {
			if (value.length != 4)
				return false;
			if (value[3] === null)
				return true;
			return is_dom_instruction_type(value[3]);
		}
		case 'block': return value.length === 5 && is_number(value[3]) && is_number(value[4]);
		case 'tagged':
		case 'tagged_begin':
		case 'tagged_call': {
			if (value.length != 4)
				return false;
			let tag_pack = value[3];
			if (tag_pack === null)
				return true;
			return is_dom_instruction_tagged_pack(tag_pack);
		}
		default: assert_type<never>(value); return false;
	}
}
