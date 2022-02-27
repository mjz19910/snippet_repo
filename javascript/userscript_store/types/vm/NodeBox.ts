import {Box} from "./Box";

export class NodeBox extends Box<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
