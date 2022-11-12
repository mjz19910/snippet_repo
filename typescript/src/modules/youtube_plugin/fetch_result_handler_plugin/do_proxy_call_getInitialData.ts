import {InitialData} from "./InitialData.js"
import {yt_handlers} from "./yt_handlers.js"

export function do_proxy_call_getInitialData<A extends ()=>InitialData>(args: [A,null,Parameters<A>]) {
	return yt_handlers.on_initial_data(args)
}
