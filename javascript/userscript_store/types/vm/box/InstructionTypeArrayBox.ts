import {Box} from "./mod";
import {InstructionType} from "../instruction/mod";

export class InstructionTypeArrayBox extends Box<Box<InstructionType>[]> {
	type: "array_box" = "array_box";
	item_type: "instruction" = "instruction";
	mapped_value: InstructionType[];
	constructor(value: InstructionType[]) {
		super([]);
		this.mapped_value = value;
	}
}
