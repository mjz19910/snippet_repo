import {HeldType} from "./HeldType.js";
import {script_registry} from "./script_registry.js";
import {weak_scripts_arr} from "./weak_scripts_arr.js";
import {script_id} from "./script_id.js";
import {scripts_holders} from "./scripts_holders.js";
import {Counter} from "./Counter.js";
import {WeakRefTo} from "./WeakRefTo";

export let unregister_target_script_arr: {symbol: symbol;}[]=[];

class GCStorage<T extends {}> {
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
		unregister_target_object_arr.push(unregister_token);
		script_registry.register(target,held_value,unregister_token);
		console.log("Called register_obj with non-script",target);
		return target_id;
	}
	counter=new Counter;
	target_arr: (WeakRefTo<T>|null)[]=[];
	unregister_token_arr: {symbol: symbol;}[]=[];
}

export let target_object_id_counter=new Counter;
export let weak_target_object_arr: (WeakRefTo<{}>|null)[]=[];
export let unregister_target_object_arr: {symbol: symbol;}[]=[];

export let target_object_storage=new GCStorage<{}>();

export function register_obj_with_registry<T extends {}>(target: T) {
	let cur_storage;
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		cur_storage=target_object_storage;
		cur_storage.store_gc_object(target);
		let target_ref=cur_storage.target_arr.find((e: {ref: {deref: () => any;};}|null) => e&&e.ref.deref()===target);
		if(target_ref) {
			return target_ref.id;
		}
		let target_id=script_id.next();
		let obj_symbol=Symbol(target_id);
		let held_value: HeldType={
			type: 'held',
			scope: "object",
			id: target_id,
			key: obj_symbol
		};
		let unregister_token={
			symbol: obj_symbol
		};
		weak_target_object_arr.push({
			key: obj_symbol,
			id: target_id,
			ref: new WeakRef(target),
		});
		unregister_target_object_arr.push(unregister_token);
		script_registry.register(target,held_value,unregister_token);
		console.log("Called register_obj with non-script",target);
		return;
	}
	let obj_ref=weak_scripts_arr.find((e: null|{ref: {deref: () => any;};}) => e&&e.ref.deref()===target);
	if(obj_ref) {
		return obj_ref.id;
	}
	let target_id=script_id.next();
	let obj_symbol=Symbol(target_id);
	let held_value: HeldType={
		type: 'held',
		scope: "script_element",
		id: target_id,
		key: obj_symbol
	};
	let unregister_token={
		symbol: obj_symbol
	};
	scripts_holders.push(held_value);
	weak_scripts_arr.push({
		key: obj_symbol,
		id: target_id,
		ref: new WeakRef(target),
	});
	unregister_target_script_arr.push(unregister_token);
	script_registry.register(target,held_value,unregister_token);
	return target_id;
}
