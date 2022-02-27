import {Box} from "./Box";

export class WindowBox extends Box<Window> {
	type: "object_box" = "object_box";
	inner_type: "Window" = "Window";
}
