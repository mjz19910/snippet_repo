import {proxy_jquery} from "./proxy_jquery";

export function enable_jquery_proxy_if_needed() {
	let enable_proxy = true;
	if(enable_proxy) {
		proxy_jquery();
	}
}
