import {Extern} from "./use_extern.js";

/** @param {string} url */
export async function new_FetchRequestState(url) {
	return new Extern.PageLoaderState(url)
}
