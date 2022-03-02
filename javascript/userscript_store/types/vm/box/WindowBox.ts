import BoxTemplate from "./BoxTemplate";

export default class WindowBox extends BoxTemplate<"object_box", Window> {
	type: "object_box" = "object_box";
	extension = null;
	inner_type: "Window" = "Window";
}
