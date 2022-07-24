import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class WindowBox
	extends BoxTemplate<"object_box",Window>
	implements BoxVerify<WindowBox,"WindowBox"> {
	type: "object_box"="object_box"
	extension=null
	inner_type: "Window"="Window"
	readonly m_verify_name="WindowBox"
	verify_name(name: "WindowBox") {
		return this.m_verify_name==='WindowBox'&&name==='WindowBox'
	}
}

