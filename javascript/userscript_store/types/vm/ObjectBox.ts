import {Box} from "./Box";

export class ObjectBox extends Box<{}> {
	type: "object_box" = "object_box";
	extension: 'null' = 'null';
	inner_type: null = null;
}
