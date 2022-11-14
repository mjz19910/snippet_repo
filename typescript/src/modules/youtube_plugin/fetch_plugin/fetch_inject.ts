import {fetch_promise_handler} from "./fetch_promise_handler.js";
import {original_fetch} from "./original_fetch.js";

export function fetch_inject(request_info: RequestInfo|URL,init?: RequestInit) {
	if(!original_fetch.value) throw new Error("No original fetch");
	let ret=original_fetch.value(request_info,init);
	return ret.then(fetch_promise_handler.bind(null,{request_info, init}));
}
