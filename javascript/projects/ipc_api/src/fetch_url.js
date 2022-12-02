import {fetch_url as ipc_base_fetch_url} from "../../page_loader/src/fetch_url.js"
/**@arg {Parameters<typeof ipc_base_fetch_url>[0]} state */
export async function fetch_url(state) {
	await ipc_base_fetch_url(state)
}
