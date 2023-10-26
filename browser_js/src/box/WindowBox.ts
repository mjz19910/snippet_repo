import {BoxTemplate} from "./template/BoxTemplate.ts";

export class WindowBox extends BoxTemplate<"object_box",Window> {
	readonly type="object_box";
	readonly extension="null";
	readonly inner_type="Window";
}
