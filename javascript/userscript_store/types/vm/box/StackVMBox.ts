import {StackVM} from "types/StackVM";
import BoxTemplate from "./BoxTemplate";

export class StackVMBox extends BoxTemplate<StackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
