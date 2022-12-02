import {fetch_url as _real_fetch_url} from "../../page_loader/src/fetch_url.js"
/**@arg {Parameters<typeof _real_fetch_url>[0]} state */
export async function fetch_url(state) {
	await _real_fetch_url(state)
}
