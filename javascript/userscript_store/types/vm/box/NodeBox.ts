import {BoxTemplate} from "./mod";

export class NodeBox extends BoxTemplate<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
