import {promise_set_timeout} from "./promise_set_timeout"

export function do_async_wait(timeout: never) {
	return new Promise(promise_set_timeout.bind(null,timeout))
}
