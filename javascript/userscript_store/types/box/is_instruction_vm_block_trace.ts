import { BlockTrace } from "../vm/instruction/vm/VMBlockTrace";
import { is_dom_instruction_type } from "./create_box";

export function is_instruction_vm_block_trace(value: BlockTrace): value is BlockTrace {
	switch (value[1]) {
		case 'begin':
			switch (value[2]) {
				case null: return true;
				default: return is_dom_instruction_type(value[2]);
			}
	}
	return false;
}
