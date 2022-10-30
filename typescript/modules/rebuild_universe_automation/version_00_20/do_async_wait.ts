import {promise_set_timeout} from "./promise_set_timeout";

/**
 * @param {number | undefined} timeout
 */
export function do_async_wait(timeout) {
	return new Promise(promise_set_timeout.bind(null, timeout));
}
