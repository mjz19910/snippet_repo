import {BoxTemplate} from "../template/BoxTemplate.ts";

export class InstructionTypeBox extends BoxTemplate<"instance_box",[string][]> {
	readonly type="instance_box";
	readonly instance_type="InstructionType";
}
