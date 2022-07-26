import {fetch_url} from "../../page_loader/fetch_url.js"
import {import_ipc_plugin} from "./import_ipc_plugin.js"
import {new_FetchRequestState} from "./new_FetchRequestState.js"
export const debug=false
export const real_fetch_url={
	/**@type {typeof fetch_url|null}*/
	value: null,
}
export const g_loaded_ipc_plugins=new Map
export let state={
	depth: 0,
	exports: [
		import_ipc_plugin,
		fetch_url,
		new_FetchRequestState,
	]
}
export {
	import_ipc_plugin,
	fetch_url,
	new_FetchRequestState,
}
