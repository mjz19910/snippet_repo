import {inject_api} from "../../../../typescript/modules/DebugApi/types/inject_api";

inject_api.saved_objects=[];

/** @param {{ name: string; }} callable */
export function add_function(callable) {
	if(!inject_api.saved_objects) return;
	inject_api.saved_objects.push([callable.name,callable]);
}
