import {Box} from "./Box";

// --- Misc Boxes ---
export class GlobalThisBox extends Box<typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
