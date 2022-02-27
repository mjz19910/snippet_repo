import {IBoxImpl} from "./box/mod";

export class WindowBox extends IBoxImpl<Window> {
	type: "object_box" = "object_box";
	inner_type: "Window" = "Window";
}
