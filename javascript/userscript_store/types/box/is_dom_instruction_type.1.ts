import { DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { is_instruction_type } from "./is_instruction_type.1";


export function is_dom_instruction_type(v: DomInstructionType): v is DomInstructionType {
	if (typeof v[0] !== 'number')
		return false;
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
