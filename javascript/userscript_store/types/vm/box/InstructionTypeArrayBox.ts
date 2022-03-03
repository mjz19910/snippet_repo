import {InstructionType} from "../instruction/mod";
import ArrayBox from "./ArrayBox";

export class InstructionTypeArrayBox extends ArrayBox {
	mapped_as:"instruction_type"="instruction_type";
	mapped_value: InstructionType[];
	constructor(value: InstructionType[]) {
		super([]);
		this.mapped_value = value;
	}
}
export default InstructionTypeArrayBox;
