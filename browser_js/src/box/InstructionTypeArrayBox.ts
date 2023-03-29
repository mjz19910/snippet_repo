import {InstructionType} from "../instruction/InstructionType.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class InstructionTypeArrayBox extends BoxTemplate<"array_box",InstructionType[]> {
	readonly type="array_box";
	readonly next_member="item_type";
	readonly item_type="instruction_type[]";
}
