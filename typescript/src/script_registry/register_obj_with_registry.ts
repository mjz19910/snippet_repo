import {WeakFinalInfo} from "./WeakFinalInfo.js";
import {HeldType} from "./HeldType.js";
import {script_registry} from "./script_registry.js";
import {weak_scripts_arr} from "./weak_scripts_arr.js";
import {script_id} from "./script_id.js";
import {scripts_holders} from "./scripts_holders.js";
import {scripts_tokens} from "./scripts_tokens.js";
import {WeakRefWithKey} from "./WeakRefWithKey.js";
import {Counter} from "./Counter.js";

export let object_id_counter=new Counter;
export let weak_objects_arr: (WeakFinalInfo|null)[]=[];
export let unregister_arr: {symbol: symbol;}[]=[];

export function register_obj_with_registry<T extends object>(target: T) {
	let obj_id;
	if(!(target instanceof HTMLScriptElement)&&!(target instanceof SVGScriptElement)) {
		let target_ref=weak_objects_arr.find((e: {ref: {deref: () => any;};}|null) => e&&e.ref.deref()===target);
		if(target_ref) {
			return target_ref.id;
		}
		obj_id=script_id.next();
		let obj_symbol=Symbol(obj_id);
		let held_value: HeldType={
			type: 'held',
			id: obj_id,
			key: obj_symbol
		};
		let unregister_token={
			symbol: obj_symbol
		};
		unregister_arr.push(unregister_token);
		script_registry.register(target,held_value,unregister_token);
		console.log("Called register_obj with non-script",target);
		return;
	}
	let scripts_res: WeakFinalInfo[]=[];
	for(let i=0;i<weak_scripts_arr.length;i++) {
		let elem=weak_scripts_arr[i];
		if(elem!==null) {
			scripts_res.push(elem);
		}
	}
	let obj_ref=weak_scripts_arr.find((e: null|{ref: {deref: () => any;};}) => e&&e.ref.deref()===target);
	if(obj_ref) {
		obj_id=obj_ref.id;
		return obj_id;
	}
	obj_id=script_id.id;
	script_id.inc();

	let held_obj: HeldType={
		type: 'held',
		id: obj_id,
		key: Symbol(obj_id)
	};
	let token_sym={symbol: Symbol(obj_id)};
	scripts_holders.push(held_obj);
	let token_val: WeakRefWithKey={key: held_obj.key,weak_ref: new WeakRef(token_sym)};
	scripts_tokens.push(token_val);
	weak_scripts_arr.push({
		key: held_obj.key,
		id: obj_id,
		ref: new WeakRef(target)
	});
	script_registry.register(target,held_obj,token_sym);
	return obj_id;
}
