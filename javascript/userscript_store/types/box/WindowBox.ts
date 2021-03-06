import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class WindowBox
	extends BoxTemplate<"object_box",Window>
	implements BoxVerify<WindowBox,"WindowBox"> {
	readonly type="object_box"
	readonly extension=null
	readonly inner_type="Window"
	readonly m_verify_name="WindowBox"
	verify_name(name: "WindowBox") {
		return this.m_verify_name==='WindowBox'&&name==='WindowBox'
	}
}

