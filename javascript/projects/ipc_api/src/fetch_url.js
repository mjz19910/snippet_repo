import {fetch_url as _real_fetch_url} from "../../page_loader/fetch_url.js";
/**@arg {Parameters<typeof _real_fetch_url>[0]} state */
export async function fetch_url(state) {
	if(!state)
		throw new Error("No state");
	if(!state.on_incoming_message)
		throw new Error("No Handler for server response");
	await _real_fetch_url(state);
}
