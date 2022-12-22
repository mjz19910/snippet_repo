import {inject_api} from "../../../../typescript/modules/DebugApi/types/inject_api.js";

inject_api.saved_instances=[];

/** @param {{ name: string; }} constructable @arg {{}} object */
export function add_object(constructable,object) {
	inject_api.saved_instances?.push([constructable.name,constructable,object]);
}
