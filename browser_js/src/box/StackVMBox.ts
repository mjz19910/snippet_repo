import {StackVM} from "../vm/StackVM.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class StackVMBox extends BoxTemplate<"custom_box",StackVM> {
	readonly type="custom_box";
	readonly box_type="StackVM";
}
