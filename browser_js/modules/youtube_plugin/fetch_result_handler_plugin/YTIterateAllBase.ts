import {yt_state_map} from "./yt_state_map.ts";

export class YTIterateAllBase {
	default_iter(path: string,data: {[str: string]: {};}) {
		if(data===void 0) {
			return;
		}
		if(typeof data==='string') {
			this.update_state(path,data);
			return;
		}
		if(data instanceof Array) {
			for(let [key,value] of data.entries()) {
				this.default_iter(`${path}[${key}]`,value);
			}
			return;
		}
		for(let [key,value] of Object.entries(data)) {
			this.default_iter(`${path}.${key}`,value);
			let iter_this_any: any=this;
			let iter_this_type: {[x: string]: any;}=iter_this_any;
			if(iter_this_type[key]) {
				iter_this_type[key](`${path}.${key}`,value);
			}
		}
	}
	update_state(key: string,value: string) {
		if(yt_state_map.has(key)) {
			let stored_state=yt_state_map.get(key);
			if(stored_state instanceof Array) {
				stored_state.push(value);
				return;
			}
			yt_state_map.set(key,[stored_state,value]);
		} else {
			yt_state_map.set(key,[value]);
		}
	}
}
