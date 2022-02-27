import {IBoxImpl} from "./mod";

export class EmptyArrayBox extends IBoxImpl<[]> {
	type: "array_box" = "array_box";
}
