import {IBoxImpl} from "./box/mod";

export class ObjectBox extends IBoxImpl<{}> {
	type: "object_box" = "object_box";
	extension: 'null' = 'null';
	inner_type: null = null;
}
