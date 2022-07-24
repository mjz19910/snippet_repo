import { InstructionType } from "../../vm/instruction/mod";
import { is_array_of } from "./is_array_of";
import { is_box } from "./is_box";

export function is_array_of_InstructionType<T>(value: InstructionType[] | T[]): value is InstructionType[] {
	return is_array_of(value, function (inner_value): inner_value is InstructionType {
		return is_box(inner_value);
	});
}
