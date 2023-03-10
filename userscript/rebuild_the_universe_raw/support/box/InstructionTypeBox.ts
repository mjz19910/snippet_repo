import {BoxTemplate} from "./template/BoxTemplate.js";

export class InstructionTypeBox extends BoxTemplate<"instance_box",[string][]> {
	readonly type="instance_box";
	readonly instance_type="InstructionType";
}
