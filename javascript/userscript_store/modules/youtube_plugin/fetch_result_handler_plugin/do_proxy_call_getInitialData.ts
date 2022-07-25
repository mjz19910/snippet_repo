import {yt_handlers} from "./yt_handlers"

export function do_proxy_call_getInitialData(args: any) {
	return yt_handlers.on_initial_data(args)
}
