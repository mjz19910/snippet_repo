import {IStackVM} from "./IStackVM";
import {IBoxImpl} from "./box/mod";

export class IStackVMBox extends IBoxImpl<IStackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
