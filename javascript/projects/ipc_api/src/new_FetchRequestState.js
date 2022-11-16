import {PageLoaderState} from "../../page_loader/PageLoaderState.js"
/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	return new PageLoaderState(url)
}
