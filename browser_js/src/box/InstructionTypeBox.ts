import {InstructionType} from "../instruction/InstructionType.ts";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class InstructionTypeBox extends BoxTemplate<"instance_box",InstructionType> {
	readonly type="instance_box";
	readonly instance_type="InstructionType";
}
