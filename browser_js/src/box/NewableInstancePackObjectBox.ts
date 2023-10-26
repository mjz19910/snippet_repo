import {NewableInstancePack} from "./NewableInstancePack.ts";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class NewableInstancePackObjectBox extends BoxTemplate<"NewableInstancePack<{}>",NewableInstancePack<{}>> {
	readonly type="NewableInstancePack<{}>";
}
