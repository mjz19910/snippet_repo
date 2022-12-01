import {GCStorage} from "./GCStorage";

export let unregister_target_script_arr: {symbol: symbol; storage_id: number;}[]=[];

export let target_object_storage=new GCStorage<{}>();
export let target_script_storage=new GCStorage<HTMLOrSVGScriptElement>();

export function register_obj_with_registry<T extends {}>(target: T) {
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		return target_object_storage.store_gc_object(target);
	}
	return target_script_storage.store_gc_object(target);
}
