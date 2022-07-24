import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class NodeBox
	extends BoxTemplate<"instance_box",Node>
	implements BoxVerify<NodeBox,"NodeBox"> {
	readonly type="instance_box";
	instance_type: "Node"="Node";
	from: "create"|"get"="create";
	readonly m_verify_name="NodeBox";
	verify_name(name: "NodeBox") {
		return this.m_verify_name==='NodeBox'&&name==='NodeBox'
	}
}
