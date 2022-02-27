import {IStackVM} from "./IStackVM";
import {Box} from "./Box";

export class IStackVMBox extends Box<IStackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
