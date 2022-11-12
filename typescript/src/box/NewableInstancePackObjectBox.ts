import {NewableInstancePack} from "./NewableInstancePack.js"
import {BoxTemplate} from "./template/BoxTemplate.js"

export class NewableInstancePackObjectBox extends BoxTemplate<"NewableInstancePack<{}>",NewableInstancePack<{}>> {
	readonly type="NewableInstancePack<{}>"
	readonly m_verify_name="NewableInstancePackObjectBox"
	verify_name(name: "NewableInstancePackObjectBox") {
		return this.m_verify_name==="NewableInstancePackObjectBox"&&name==="NewableInstancePackObjectBox"
	}
}
