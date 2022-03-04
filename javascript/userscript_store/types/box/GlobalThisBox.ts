import {BoxTemplate} from "./BoxTemplate";

// --- Misc Boxes ---
export class GlobalThisBox extends BoxTemplate<"value_box", typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
