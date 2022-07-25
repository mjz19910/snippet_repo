import {WeakFinalInfo} from "./WeakFinalInfo"
import {HeldType} from "./HeldType"
import {scripts_holders, scripts_tokens, weak_scripts_arr, script_id, script_registry} from "./mod"
export function register_obj_with_registry(obj: any) {
	let obj_id
	let scripts_res: WeakFinalInfo[]=[]
	for(let i=0;i<weak_scripts_arr.length;i++) {
		let elem=weak_scripts_arr[i]
		if(elem!==null) {
			scripts_res.push(elem)
		}
	}
	let obj_ref=weak_scripts_arr.find((e: null|{ref: {deref: () => any}}) => e&&e.ref.deref()===obj)
	if(obj_ref) {
		obj_id=obj_ref.id
		return obj_id
	}
	obj_id=script_id.id
	script_id.inc()

	let held_obj: HeldType={
		type: 'held',
		id: obj_id,
		key: Symbol(obj_id)
	}
	let token_sym={token: Symbol(-obj_id)}
	scripts_holders.push(held_obj)
	scripts_tokens.push({key: held_obj.key,weak_ptr: new WeakRef(token_sym)})
	weak_scripts_arr.push({
		key: held_obj.key,
		id: obj_id,
		ref: new WeakRef(obj)
	})
	script_registry.register(obj,held_obj,token_sym)
	return obj_id
}
