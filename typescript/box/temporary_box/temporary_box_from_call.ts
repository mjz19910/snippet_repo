import {BoxVerify} from "../BoxVerify"
import {TemporaryBoxTemplate} from "./template/TemporaryBoxTemplate"
export class temporary_box_from_call
	extends TemporaryBoxTemplate<{}>
	implements BoxVerify<temporary_box_from_call,"temporary_box_from_call"> {
	readonly type='temporary_box'
	readonly source='call'
	readonly m_verify_name="temporary_box_from_call"
	readonly extension=null
	verify_name(name: "temporary_box_from_call") {
		return this.m_verify_name==='temporary_box_from_call'&&name==='temporary_box_from_call'
	}
}
