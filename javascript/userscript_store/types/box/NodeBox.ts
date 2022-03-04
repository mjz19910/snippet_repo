import {BoxTemplate} from "./BoxTemplate";

export class NodeBox extends BoxTemplate<"instance_box", Node> {
	type: "instance_box" = "instance_box";
	instance_type: "Node" = "Node";
	from: "create" | "get" = "create";
	readonly m_verify_name="NodeBox";
	verify_name(name:"NodeBox") {
		if(this.m_verify_name !== 'NodeBox' || name !== 'NodeBox'){
			throw new Error("Bad box");
		}
	}
}
