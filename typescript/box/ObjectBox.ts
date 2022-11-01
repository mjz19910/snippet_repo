import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class ObjectBox
	extends BoxTemplate<"object_box",Record<never, never>>
	implements BoxVerify<ObjectBox,"ObjectBox">
{
	readonly type="object_box"
	readonly inner_type="Record<never, never>"
	readonly m_verify_name="ObjectBox"
	readonly extension=null
	verify_name(name: "ObjectBox") {
		return this.m_verify_name==='ObjectBox'&&name==='ObjectBox'
	}
}
