import {NewableInstancePack} from "../interface/NewableInstancePack.ts";
import {BoxTemplate} from "../template/BoxTemplate.ts";

export class NewableInstancePackBox extends BoxTemplate<"instance_box",NewableInstancePack<Record<never,never>>> {
	readonly type="instance_box";
	readonly instance_type="NewableInstancePack<{}>";
}
