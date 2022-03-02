import {StackVM} from "../StackVM";
import BoxTemplate from "./BoxTemplate";

export default class StackVMBox extends BoxTemplate<"custom_box", StackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
}
