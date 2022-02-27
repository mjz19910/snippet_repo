import {BoxTemplate} from "./BoxTemplate";

// --- Misc Boxes ---
export class GlobalThisBox extends BoxTemplate<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
