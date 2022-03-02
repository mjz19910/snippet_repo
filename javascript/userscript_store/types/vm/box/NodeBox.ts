import BoxTemplate from "./BoxTemplate";

export default class NodeBox extends BoxTemplate<"instance_box", Node> {
	type: "instance_box" = "instance_box";
	inner_type:"Node"="Node";
	from: "create" | "get" = "create";
}
