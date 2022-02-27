import BoxTemplate from "./BoxTemplate";

export class WindowBox extends BoxTemplate<Window> {
	type: "object_box" = "object_box";
	extension = null;
	inner_type: "Window" = "Window";
}
