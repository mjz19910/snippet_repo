import {fetch_promise_handler} from "./fetch_promise_handler.ts";
import {original_fetch} from "./original_fetch.ts";

export async function fetch_inject(request_info: RequestInfo|URL,init?: RequestInit) {
	if(!original_fetch.value) throw new Error("No original fetch");
	let ret=original_fetch.value(request_info,init);
	const res=await ret;
	return fetch_promise_handler({
		response: res,
		request_info,
		init,
	},res);
}
