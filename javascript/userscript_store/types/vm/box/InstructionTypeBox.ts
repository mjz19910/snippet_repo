import {InstructionType} from "../instruction/mod";
import BoxTemplate from "./BoxTemplate";


export default class InstructionTypeBox extends BoxTemplate<"instance_box", InstructionType> {
	type:"instance_box"="instance_box";
	inner_type:"InstructionType"="InstructionType";
}
