import {BoxTemplate} from "./mod";

export class ObjectBox extends BoxTemplate<{}> {
	type: "object_box" = "object_box";
	inner_type: 'unit' = 'unit';
}
