import {HeldType} from "./HeldType.js";
import {script_registry} from "./script_registry.js";
import {Counter} from "./Counter.js";
import {WeakRefTo} from "./WeakRefTo";

export let unregister_target_script_arr: {symbol: symbol;}[]=[];

export let gc_storage_id_counter=new Counter;

class GCStorage<T extends {}> {
	storage_id=gc_storage_id_counter.next();
	store_gc_object(target: T) {
		let target_ref=this.target_arr.find(e => e!==null&&e.ref.deref()===target);
		if(target_ref) {
			return target_ref.id;
		}
		let target_id=this.counter.next();
		let obj_symbol=Symbol(target_id);
		let held_value: HeldType={
			type: 'held',
			scope: "object",
			storage_id:this.storage_id,
			id: target_id,
			key: obj_symbol
		};
		let unregister_token={
			symbol: obj_symbol
		};
		this.target_arr.push({
			key: obj_symbol,
			id: target_id,
			ref: new WeakRef(target),
		});
		this.unregister_token_arr.push(unregister_token);
		script_registry.register(target,held_value,unregister_token);
		console.log("Called register_obj with non-script",target);
		return target_id;
	}
	counter=new Counter;
	target_arr: (WeakRefTo<T>|null)[]=[];
	unregister_token_arr: {symbol: symbol;}[]=[];
}

export let target_object_storage=new GCStorage<{}>();
export let target_script_storage=new GCStorage<HTMLOrSVGScriptElement>();

export function register_obj_with_registry<T extends {}>(target: T) {
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		return target_object_storage.store_gc_object(target);
	}
	return target_script_storage.store_gc_object(target);
}
