import {NewableInstancePack} from "./NewableInstancePack.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";

export class NewableInstancePackBox extends BoxTemplate<"instance_box",NewableInstancePack<{}>> {
	readonly type="instance_box";
	readonly instance_type="NewableInstancePack<{}>";
}
