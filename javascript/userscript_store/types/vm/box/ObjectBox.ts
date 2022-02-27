import {BoxTemplate} from "./BoxTemplate";

export class ObjectBox extends BoxTemplate<{}> {
	type: "object_box" = "object_box";
	inner_type: 'unit' = 'unit';
}
