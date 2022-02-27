import {Box} from "./box/mod";

// --- Misc Boxes ---
export class GlobalThisBox extends Box<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
