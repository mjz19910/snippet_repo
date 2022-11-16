import {fetch_url} from "./fetch_url.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";
/** @param {PageLoaderFetchRequestState} state */
export function make_reload_page_handler(state) {
	return async () => {
		console.log('make_reload_page_handler use');
		await fetch_url(state);
	};
}

export function use_types() {
	return [
		PageLoaderFetchRequestState,
	];
}
