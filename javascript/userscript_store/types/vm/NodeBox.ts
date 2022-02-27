import {IBoxImpl} from "./box/mod";

export class NodeBox extends IBoxImpl<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
