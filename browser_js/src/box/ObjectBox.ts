import {BoxTemplate} from "./template/BoxTemplate.ts";

export class ObjectBox extends BoxTemplate<"object_box",{}> {
	readonly type="object_box";
	readonly inner_type="object";
	readonly extension="null";
}
