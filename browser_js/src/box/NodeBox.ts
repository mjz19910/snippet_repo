import {BoxTemplate} from "./template/BoxTemplate.ts";

export class NodeBox extends BoxTemplate<"instance_box",Node> {
	readonly type="instance_box";
	readonly instance_type="Node";
}
