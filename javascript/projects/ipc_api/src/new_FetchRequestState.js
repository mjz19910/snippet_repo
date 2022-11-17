import {PageLoaderState} from "../../page_loader/index.js"
/**
 * @param {string} url
 */
export async function new_FetchRequestState(url) {
	return new PageLoaderState(url)
}
