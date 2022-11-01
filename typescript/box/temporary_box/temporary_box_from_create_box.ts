import {BoxVerify} from "../BoxVerify.js"
import {TemporaryBoxTemplate} from "./template/TemporaryBoxTemplate.js"
export class temporary_box_from_create_box
	extends TemporaryBoxTemplate<Function|FunctionConstructor>
	implements BoxVerify<temporary_box_from_create_box,"temporary_box_from_create_box">
{
	readonly type="temporary_box"
	readonly source="create_box"
	readonly m_verify_name="temporary_box_from_create_box"
	readonly extension=null
	verify_name(name: "temporary_box_from_create_box") {
		return this.m_verify_name==='temporary_box_from_create_box'&&name==='temporary_box_from_create_box'
	}
}
