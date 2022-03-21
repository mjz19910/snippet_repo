import {DelPropertiesState} from "./DelPropertiesState.js";
/**
 * @param {DelPropertiesState} state
 * @param {any[][]} cc
 * @param {string} key
 * @param {(TypedPropertyDescriptor<any> & PropertyDescriptor)} property_descriptor
 */
export function del_all_properties_1(state, cc, key, property_descriptor) {
	cc.push([key, property_descriptor]);
	try {
		console.log('del', key, property_descriptor);
	} catch(e) {
		e;
		debugger;
	}
	if(property_descriptor.value === void 0)
		return;
	if(!state.new_cache.includes(property_descriptor.value)) {
		state.new_cache.push(property_descriptor.value);
		state.new_del.push(property_descriptor.value);
	}
}
