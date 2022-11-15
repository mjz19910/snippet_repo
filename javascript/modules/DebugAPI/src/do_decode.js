import {g_obj_arr,id_map,id_map_str} from "./mod";

/**
 * @param {string | number} val
 */
export function do_decode(val) {
	if(typeof val==='number') {
		let fv=g_obj_arr.slice(1).find(e => e.value[0]===val);
		if(!fv) {
			console.log('not found',val);
			return;
		}
		id_map[val]=fv.value.slice(2);
	} else {
		let fv=g_obj_arr.slice(1).find(e => e.value[0]===val);
		if(!fv) {
			console.log('not found',val);
			return;
		}
		id_map_str.set(val,fv.value.slice(2));
	}
}
