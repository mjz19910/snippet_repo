import {use_jquery} from "./use_jquery"
import {set_jq_proxy} from "./set_jq_proxy"

export function proxy_jquery() {
	let val=use_jquery()
	set_jq_proxy(val)
}
