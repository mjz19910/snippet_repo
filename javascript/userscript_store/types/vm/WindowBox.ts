import {Box} from "./box/mod";

export class WindowBox extends Box<Window> {
	type: "object_box" = "object_box";
	inner_type: "Window" = "Window";
}
