import {DelPropertiesState} from "./DelPropertiesState.js";
import {del_all_properties_1} from "./del_all_properties_1.js";

/**@arg {DelPropertiesState} state@arg {any} tq*/
export function del_all_properties(state, tq) {
	while(tq) {
		/**@type {[string, TypedPropertyDescriptor<any> & PropertyDescriptor][]}*/
		let cc;
		if(state.remove_map.has(tq)) {
			let v = state.remove_map.get(tq);
			if(!v)
				throw new Error("Unreachable");
			cc = v;
		} else {
			cc = [];
			state.remove_map.set(tq, cc);
		}
		for(let k of Object.entries(Object.getOwnPropertyDescriptors(tq))) {
			if(k[1].configurable) {
				if(state.ctx_req.includes(k[1].value))
					continue;
				delete tq[k[0]];
				del_all_properties_1(state, cc, ...k);
			} else {
				if(k[1].writable) {
					del_all_properties_1(state, cc, ...k);
					tq[k[0]] = void 0;
				}
			}
		}
		tq = Object.getPrototypeOf(tq);
	}
}
