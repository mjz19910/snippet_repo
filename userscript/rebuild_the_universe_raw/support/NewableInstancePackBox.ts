import {NewableInstancePack} from "./box/interface/NewableInstancePack.js";
import {BoxTemplate} from "./box/template/BoxTemplate.js";

export class NewableInstancePackBox extends BoxTemplate<"instance_box",NewableInstancePack<{}>> {
	readonly type="instance_box";
	readonly instance_type="NewableInstancePack<{}>";
}
