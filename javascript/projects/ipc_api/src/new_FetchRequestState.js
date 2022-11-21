import {PageLoaderState} from "../../page_loader/src/PageLoaderState.js"
/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	return new PageLoaderState(url)
}
