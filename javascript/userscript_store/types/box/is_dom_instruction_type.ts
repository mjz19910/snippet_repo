import { DomInstructionNullMarker, DomInstructionType } from "../vm/instruction/vm/VMBlockTrace";
import { is_dom_instruction_vm_block_trace } from "./is_dom_instruction_vm_block_trace";
import { is_dom_instruction_tagged_pack } from "./is_dom_instruction_tagged_pack";
import { is_instruction_type } from "./is_instruction_type";
import { assert_type } from "./assert_type";

export function is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if (typeof value[0] !== "number") {
		assert_type<never>(value[0]);
		return false;
	}
	let [, ...instruction_base] = value;
	if (is_instruction_type(instruction_base)) return true;
	switch (value[1]) { case 'push_global_object': return is_instruction_type(['push_window_object']); }
	switch (value[1]) {
		case 'vm_call_at': return value.length === 3 && is_dom_instruction_tagged_pack(value[2]);
		case 'modify_operand': return value.length === 4 && is_instruction_type([value[1], value[2], value[3]]);
	}
	switch (value[1]) {
		case 'dom_filter_6': switch (value.length) { case 6: return true; }
		case 'dom_filter_7': switch (value.length) { case 7: return true; }
	}
	switch (value[1]) {
		case 'marker': assert_type<DomInstructionNullMarker>(value); return value.length === 3 && value[2] === null;
		case 'vm_block_trace': return is_dom_instruction_vm_block_trace(value);
		case 'vm_return': return value.length === 2;
		default:
			console.log('missing type for dom instruction', [value[1]][0], 'with args=', [value[1]].slice(1));
			throw new Error("Missing type");
	}
}
