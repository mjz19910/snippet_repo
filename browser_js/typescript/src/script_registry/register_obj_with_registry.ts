import {target_object_store} from "./gc_store/target_object_store.js";
import {target_script_store} from "./gc_store/target_script_store.js";

export function register_obj_with_registry<T extends {}>(target: T) {
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		return target_object_store.store_gc_object(target);
	}
	return target_script_store.store_gc_object(target);
}
