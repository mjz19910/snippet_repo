import {blob_create_args_arr} from "./blob_create_args_arr.js"
import {leftover_args} from "./leftover_args.js"
import {active_blob_set} from "./active_blob_set.js"

export function init_blob_logger() {
	URL.createObjectURL=new Proxy(URL.createObjectURL,{
		apply(...arr) {
			let [target_fn,this_,args]=arr
			let [url_source,...rest]=args
			if(rest.length>0) {
				(leftover_args as [(obj: Blob|MediaSource) => string,any,any][]).push([target_fn,this_,rest])
			}
			blob_create_args_arr.push(url_source)
			let ret=Reflect.apply(...arr)
			active_blob_set.add(ret)
			return ret
		}
	})
	URL.revokeObjectURL=new Proxy(URL.revokeObjectURL,{
		apply(...proxy_args) {
			let val=proxy_args[2][0]
			active_blob_set.delete(val)
			return Reflect.apply(...proxy_args)
		}
	})
}
