import {DelPropertiesState} from "./DelPropertiesState.js";
/** @arg {DelPropertiesState} state @arg {any[][]} cc @arg {string} key @arg {(TypedPropertyDescriptor<any> & PropertyDescriptor)} property_descriptor @arg {any} obj */
export function del_all_properties_1(state,obj,cc,key,property_descriptor) {
	state.del_parents.push([obj,key,property_descriptor]);
	cc.push([obj,key,property_descriptor]);
	try {
		console.log('del',key,property_descriptor);
	} catch(e) {
		e;
		let undo_try_fn=() => console.log('del',key,property_descriptor);
		state.del_undo_init();
		state.del_undo_until_ok(undo_try_fn);
	}
	if(property_descriptor.value===void 0)
		return;
	if(!state.new_cache.includes(property_descriptor.value)) {
		state.new_cache.push(property_descriptor.value);
		state.new_del.push(property_descriptor.value);
	}
}
