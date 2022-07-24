import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class GlobalThisBox extends BoxTemplate<"value_box",typeof globalThis> implements BoxVerify<GlobalThisBox,"GlobalThisBox"> {
	readonly type="value_box"
	readonly inner_value="globalThis"
	readonly m_verify_name="GlobalThisBox"
	verify_name(name: "GlobalThisBox") {
		return this.m_verify_name==='GlobalThisBox'&&name==='GlobalThisBox'
	}
}
