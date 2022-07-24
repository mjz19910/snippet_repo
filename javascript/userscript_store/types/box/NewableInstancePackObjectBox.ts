import { NewableInstancePack } from "./NewableInstancePack";
import { BoxTemplate } from "./BoxTemplate";

export class NewableInstancePackObjectBox extends BoxTemplate<"NewableInstancePack<{}>", NewableInstancePack<{}>> {
	readonly type: "NewableInstancePack<{}>" = "NewableInstancePack<{}>";
	readonly m_verify_name = "BoxedNewableInstancePackObject";
	verify_name(name: "BoxedNewableInstancePackObject") {
		return this.m_verify_name === "BoxedNewableInstancePackObject" && name === "BoxedNewableInstancePackObject";
	}
}
