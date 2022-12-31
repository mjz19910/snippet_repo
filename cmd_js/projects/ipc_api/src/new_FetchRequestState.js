import {Extern} from "./use_extern.js";

/** @arg {string} url */
export async function new_FetchRequestState(url) {
	return new Extern.PageLoaderState(url)
}
