import {fetch_url} from "./fetch_url.js";
import {FetchRequestState} from "./FetchRequestState.js";
import {FetchStateFlags} from "./FetchStateFlags";
import {fix_fetch_url} from "./fix_fetch_url.js";
import {run_fetch_algorithm} from "./run_fetch_algorithm.js";
/**@type {Buffer[]} */
export let data = [];
/** @type {{request?:{}}} */
export let dom_state = {};
export {
	fetch_url,
	fix_fetch_url,
	FetchRequestState,
	FetchStateFlags,
	run_fetch_algorithm,
};

export function used_imports() {
	return [
		fetch_url,
		fix_fetch_url,
		FetchRequestState,
		FetchStateFlags,
		run_fetch_algorithm,
	];
}
