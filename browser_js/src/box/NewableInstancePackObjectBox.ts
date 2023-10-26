import {NewableInstancePack} from "./NewableInstancePack.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";

export class NewableInstancePackObjectBox extends BoxTemplate<"NewableInstancePack<{}>",NewableInstancePack<{}>> {
	readonly type="NewableInstancePack<{}>";
}
