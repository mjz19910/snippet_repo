import {mk} from "./yt_application_create_plugin/mk"

export function walk_key_path(cc: {value?: any; value_tr?: any; value_of?: any; noisy_flag?: any},ms: string,obj: {},mc?: string) {
	let fs
	let mt=ms.match(cc.value_tr)
	if(mt!==null) {
		fs=mt[0]
	} else {
		return mc
	}
	let f2=ms.slice(fs.length+1)
	let dx=f2.indexOf('.')
	let pq
	if(dx>-1) {
		pq=f2.slice(0,dx)
	} else {
		pq=f2
	}
	if(pq.length>0) {
		if((cc.value_tr+'.'+pq)==mc) {
			return cc.value_tr+'.'+pq
		}
		mk(obj,pq,cc.value_tr+'.'+pq,cc.noisy_flag)
		return cc.value_tr+'.'+pq
	}
}
