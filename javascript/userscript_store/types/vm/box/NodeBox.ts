import BoxTemplate from "./BoxTemplate";

export default class NodeBox extends BoxTemplate<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
