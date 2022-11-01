import {use_jquery} from "./use_jquery.js"
import {set_jq_proxy} from "./set_jq_proxy.js"

export function proxy_jquery() {
	let val=use_jquery()
	set_jq_proxy(val)
}
