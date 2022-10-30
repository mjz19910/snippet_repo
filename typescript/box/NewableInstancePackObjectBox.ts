import {NewableInstancePack} from "./NewableInstancePack"
import {BoxTemplate} from "./template/BoxTemplate"

export class NewableInstancePackObjectBox extends BoxTemplate<"NewableInstancePack<{}>",NewableInstancePack<{}>> {
	readonly type="NewableInstancePack<{}>"
	readonly m_verify_name="NewableInstancePackObjectBox"
	verify_name(name: "NewableInstancePackObjectBox") {
		return this.m_verify_name==="NewableInstancePackObjectBox"&&name==="NewableInstancePackObjectBox"
	}
}
