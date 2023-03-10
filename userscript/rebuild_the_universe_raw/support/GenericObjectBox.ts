import {BoxTemplate} from "./BoxTemplate.js";

export class GenericObjectBox extends BoxTemplate<"object_box",{}> {
	readonly type="object_box";
	readonly inner_type="object";
	readonly extension="null";
}
