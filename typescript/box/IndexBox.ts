import {Box} from "./Box.js"
import {BoxTemplate} from "./template/BoxTemplate.js"
import {IndexAccess} from "./IndexAccess.js"
import {BoxVerify} from "./BoxVerify.js"

export class IndexBox
	extends BoxTemplate<"object_box",IndexAccess<Box>>
	implements BoxVerify<IndexBox,"IndexBox">
{
	readonly type="object_box"
	readonly m_verify_name="IndexBox"
	readonly like_type="object_box"
	readonly extension='index'
	readonly index_type="Box"
	readonly inner_type="Box"
	verify_name(name: "IndexBox") {
		return this.m_verify_name==='IndexBox'&&name==='IndexBox'
	}
}
