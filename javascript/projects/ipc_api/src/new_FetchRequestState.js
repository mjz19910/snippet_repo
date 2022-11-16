import {PageLoaderFetchRequestState} from "../../page_loader/PageLoaderFetchRequestState.js"
/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	return new PageLoaderFetchRequestState(url)
}
