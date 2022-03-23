import {FetchRequestState} from "../../page_loader/FetchRequestState.js";
/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	return new FetchRequestState(url);
}
