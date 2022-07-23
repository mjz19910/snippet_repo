import { DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { assert_type } from "./assert_type";
import { is_instruction_type } from "./is_instruction_type";


export function is_dom_instruction_type(v: DomInstructionType): v is DomInstructionType {
	if (typeof v[0] !== 'number') return false;
	let [, ...instruction_base] = v;
	if (is_instruction_type(instruction_base)) return true;
	switch (instruction_base[0]) {
		case 'dom_filter_6': return true;
		case 'dom_filter_7': return true;
		case 'marker': return true;
		case 'vm_call_at': return true;
		case 'push_global_object': return is_instruction_type(['push_window_object'])
		default: assert_type<never>(instruction_base); return false;
	}
}
