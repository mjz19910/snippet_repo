import {StackVM} from "types/StackVM";
import {Box} from "./mod";

export class StackVMBox extends Box<StackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
