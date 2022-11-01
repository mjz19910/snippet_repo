import {Box} from "../Box.js"
import {BoxVerify} from "../BoxVerify.js"
import {TemporaryBoxTemplate} from "./template/TemporaryBoxTemplate.js"
export class temporary_box_object_index_to_box
	extends TemporaryBoxTemplate<{[x: string]: Box}>
	implements BoxVerify<temporary_box_object_index_to_box,"temporary_box_object_index_to_box"> {
	readonly type='temporary_box'
	readonly source='cast'
	readonly cast_source='object_index'
	readonly m_verify_name="temporary_box_object_index_to_box"
	readonly extension=null
	verify_name(name: "temporary_box_object_index_to_box") {
		return this.m_verify_name==='temporary_box_object_index_to_box'&&name==='temporary_box_object_index_to_box'
	}
}
