import {fetch_url} from "./fetch_url.js";
import {PageLoaderState} from "./PageLoaderState.js/index.js";

/** @param {PageLoaderState} state */
export function make_reload_page_handler(state) {
	return async () => {
		console.log('make_reload_page_handler use');
		await fetch_url(state);
	};
}

export function use_types() {
	return [
		PageLoaderState,
	];
}
