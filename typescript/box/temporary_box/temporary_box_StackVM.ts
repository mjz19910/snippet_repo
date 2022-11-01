import {StackVM} from "../../vm/StackVM.ts"
import {BoxVerify} from "../BoxVerify.ts"
import {TemporaryBoxTemplate} from "./template/TemporaryBoxTemplate.ts"
export class temporary_box_StackVM
	extends TemporaryBoxTemplate<StackVM>
	implements BoxVerify<temporary_box_StackVM,"temporary_box_StackVM"> {
	readonly type='temporary_box'
	readonly extension='custom_box_cast'
	readonly source='cast'
	readonly custom_type='StackVM'
	readonly cast_source='object_index'
	readonly m_verify_name="temporary_box_StackVM"
	verify_name(name: "temporary_box_StackVM") {
		return this.m_verify_name==='temporary_box_StackVM'&&name==='temporary_box_StackVM'
	}
}
