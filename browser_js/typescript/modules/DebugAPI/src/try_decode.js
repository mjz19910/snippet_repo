import {decode_map} from "./decode_map";

/** @param {string | number | Repeat_0<number>} e */
export function try_decode(e,deep=true) {
	if(typeof e==='number') {
		if(dr_map[e]) {
			return dr_map[e];
		}
		if(id_map[e]) {
			let res=id_map[e];
			if(!deep)
				return res;
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			dr_map[e]=dec_res;
			return dec_res;
		}
		if(ids_dec[e]) {
			return ids_dec[e];
		}
	}
	if(e instanceof Repeat_0) {
		if(dr_map[e.value]) {
			return dr_map[e.value];
		}
		if(id_map[e.value]) {
			let res=id_map[e.value];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			let ret=new Repeat_0(dec_res,e.times);
			dr_map[e.value]=ret;
			return ret;
		}
		if(ids_dec[e.value]) {
			return new Repeat_0(ids_dec[e.value],e.times);
		}
	}
	return null;
}
