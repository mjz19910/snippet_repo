import {IBoxImpl} from "./mod";

// --- Misc Boxes ---
export class GlobalThisBox extends IBoxImpl<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
