import {FetchRequestState} from "./mod.js";

/**
 * @param {FetchRequestState} state
 */
export function fix_fetch_url(state) {
	if(!state.url)
		return;
	try {
		new URL(state.url);
	} catch {
		try {
			let new_url = "http://" + state.url;
			new URL(new_url);
			state.url = new_url;
		} catch {}
	}
}
