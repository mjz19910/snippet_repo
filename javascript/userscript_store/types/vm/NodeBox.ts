import {Box} from "./box/mod";

export class NodeBox extends Box<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
