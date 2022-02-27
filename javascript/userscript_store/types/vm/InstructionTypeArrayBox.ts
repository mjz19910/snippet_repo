import {IBoxImpl} from "./box/mod";
import {InstructionType} from "./InstructionType";

export class InstructionTypeArrayBox extends IBoxImpl<IBoxImpl<InstructionType>[]> {
	type: "array_box" = "array_box";
	item_type: "instruction" = "instruction";
	mapped_value: InstructionType[];
	constructor(value: InstructionType[]) {
		super([]);
		this.mapped_value = value;
	}
}
