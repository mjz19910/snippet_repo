import { NewableInstancePack } from "./NewableInstancePack";
import { BoxTemplate } from "./BoxTemplate";

export class BoxedNewableInstancePackObject extends BoxTemplate<"NewableInstancePackObject", NewableInstancePack<{}>> {
	readonly type: "NewableInstancePackObject" = "NewableInstancePackObject";
	readonly m_verify_name = "BoxedNewableInstancePackObject";
	verify_name(name: "BoxedNewableInstancePackObject") {
		return this.m_verify_name === "BoxedNewableInstancePackObject" && name === "BoxedNewableInstancePackObject";
	}
}
