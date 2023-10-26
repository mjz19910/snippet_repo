import {fetch_inject} from "./fetch_inject.ts"
import {original_fetch} from "./original_fetch.ts"

export function init_fetch_plugin() {
	original_fetch.value=fetch
	window.fetch=fetch_inject
	let any_fetch_inject: any=fetch_inject
	let fetch_inject_extension: {__proxy_target__: typeof fetch}=any_fetch_inject
	fetch_inject_extension.__proxy_target__=original_fetch.value
	const is_fetch_disabled=false
	if(is_fetch_disabled)
		window.fetch=original_fetch.value
}
