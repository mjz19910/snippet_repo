import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class GlobalThisBox extends BoxTemplate<"value_box",typeof globalThis> implements BoxVerify<GlobalThisBox,"GlobalThisBox"> {
	type: "value_box"="value_box"
	inner_value: "globalThis"="globalThis"
	readonly m_verify_name="GlobalThisBox"
	verify_name(name: "GlobalThisBox") {
		return this.m_verify_name==='GlobalThisBox'&&name==='GlobalThisBox'
	}
}
