import BoxTemplate from "./BoxTemplate";

// --- Misc Boxes ---
export default class GlobalThisBox extends BoxTemplate<"value_box", typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
}
