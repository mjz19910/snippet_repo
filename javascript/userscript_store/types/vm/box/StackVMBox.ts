import {StackVM} from "../StackVM";
import {Box} from "./box/mod";

export class StackVMBox extends Box<StackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
