import {use_jquery} from "./use_jquery";
import {set_jq_proxy} from "./set_jq_proxy";

/**
 * @param {undefined} [_value]
 */
export function proxy_jquery(_value) {
	let val = use_jquery();
	set_jq_proxy(val);
}
