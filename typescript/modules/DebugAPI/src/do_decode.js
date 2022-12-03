import {g_obj_arr,id_map,id_map_str} from "./mod";

/**
 * @param {string | number} val
 */
export function do_decode(val) {
	if(typeof val==='number') {
		let fv=g_obj_arr.value.slice(1).find(e => e.value&&e.value[0]===val);
		if(!fv) return "Not found";
		if(!fv.value) return "No value";
		id_map[val]=fv.value.slice(2);
	} else if(typeof val==='string') {
		let fv=g_obj_arr.value.slice(1).find(e => {
			if(e.value===null) return false;
			if(typeof e.value[0]!=='string') return false;
			return e.value[0]===val;
		});
		if(!fv) return "Not found";
		if(!fv.value) return "No value";
		id_map_str.set(val,fv.value.slice(2));
	}
}
