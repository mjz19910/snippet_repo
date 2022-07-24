import {BoxVerify} from "../BoxVerify"
import {TemporaryBoxTemplate} from "./template/TemporaryBoxTemplate"
export class temporary_box_from_get
	extends TemporaryBoxTemplate<Function>
	implements BoxVerify<temporary_box_from_get,"temporary_box_from_get"> {
	readonly type='temporary_box'
	readonly source='get'
	readonly m_verify_name="temporary_box_from_get"
	readonly extension='Function'
	verify_name(name: "temporary_box_from_get") {
		return this.m_verify_name==='temporary_box_from_get'&&name==='temporary_box_from_get'
	}
}
