import {StackVM} from "../../StackVM.ts";
import {BoxTemplate} from "../template/BoxTemplate.ts";

export class StackVMBox extends BoxTemplate<"custom_box",StackVM> {
	readonly type="custom_box";
	readonly box_type="StackVM";
}
