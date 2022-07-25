import {yt_state} from "./youtube_plugin.user"

export class YTIterateAllBase {
	default_iter(path: string,data: {[str: string]: {}}) {
		if(data===void 0) {
			return
		}
		if(typeof data==='string') {
			this.update_state(path,data)
			return
		}
		if(data instanceof Array) {
			for(let [key,value] of data.entries()) {
				this.default_iter(`${path}[${key}]`,value)
			}
			return
		}
		for(let [key,value] of Object.entries(data)) {
			this.default_iter(`${path}.${key}`,value)
			let iter_this_any:any = this
			let iter_this_type: {[x:string]: any} = iter_this_any
			if(iter_this_type[key]) {
				iter_this_type[key](`${path}.${key}`,value)
			}
		}
	}
	/**
	 * @param {string} key
	 * @param {string} value
	 * @private
	 */
	update_state(key: string,value: string) {
		if(yt_state.has(key)) {
			let stored_state=yt_state.get(key)
			if(stored_state instanceof Array) {
				stored_state.push(value)
				return
			}
			yt_state.set(key,[stored_state,value])
		} else {
			yt_state.set(key,[value])
		}
	}
}
