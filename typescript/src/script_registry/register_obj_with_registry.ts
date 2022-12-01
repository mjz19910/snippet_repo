import {target_object_storage} from "./target_object_storage.js";
import {target_script_storage} from "./target_script_storage.js";

export function register_obj_with_registry<T extends {}>(target: T) {
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		return target_object_storage.store_gc_object(target);
	}
	return target_script_storage.store_gc_object(target);
}
