import {BoxTemplateImpl} from "../../rebuild_the_universe/rebuild_the_universe.js";
import {NewableInstancePack} from "./NewableInstancePack.js";

export class NewableInstancePackBox extends BoxTemplateImpl<"instance_box",NewableInstancePack<{}>> {
	readonly type="instance_box";
	readonly instance_type="NewableInstancePack<{}>";
}
