import { ModifyOperand } from "../vm/instruction/ModifyOperand";


export function is_instruction_modify_op<T extends Array<any>>(v: T | ModifyOperand): v is ModifyOperand {
	if (v.length === 3 &&
		v[0] === 'modify_operand' &&
		typeof v[1] === 'number' &&
		typeof v[2] === 'number')
		return true;
	return false;
}
