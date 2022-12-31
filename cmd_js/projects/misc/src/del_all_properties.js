import {DelPropertiesState} from "./DelPropertiesState.js";
import {del_all_properties_1} from "./del_all_properties_1.js";
const obj_entries=Object.entries;
const obj_proto_of=Object.getPrototypeOf;
const obj_own_props=Object.getOwnPropertyDescriptors;
const arr_includes=Array.prototype.includes;
const reflect_apply=Reflect.apply;
const map_has=Map.prototype.has;
const map_get=Map.prototype.get;
const map_prototype_set=Map.prototype.set;
const error_constructor=Error;
/** @arg {DelPropertiesState} state@arg {any} tq */
export function del_all_properties(state,tq) {
	while(tq) {
		/** @type {[string, TypedPropertyDescriptor<any> & PropertyDescriptor][]}*/
		let cc;
		if(reflect_apply(map_has,state.remove_map,[tq])) {
			let v=reflect_apply(map_get,state.remove_map,[tq]);
			if(!v)
				throw new error_constructor("Unreachable");
			cc=v;
		} else {
			cc=[];
			reflect_apply(map_prototype_set,state.remove_map,[tq,cc]);
		}
		for(let k of obj_entries(obj_own_props(tq))) {
			if(k[1].configurable) {
				if(reflect_apply(arr_includes,state.ctx_req,[k[1].value]))
					continue;
				delete tq[k[0]];
				del_all_properties_1(state,tq,cc,...k);
			} else {
				if(k[1].writable) {
					del_all_properties_1(state,tq,cc,...k);
					tq[k[0]]=void 0;
				}
			}
		}
		tq=obj_proto_of(tq);
	}
}
