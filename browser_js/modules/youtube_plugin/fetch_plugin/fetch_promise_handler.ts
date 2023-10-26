import {handle_fetch_response_1} from "./handle_fetch_response_1.js"
import {RequestInfoExt} from "./RequestInfoExt.ts";

export function fetch_promise_handler(request_info: RequestInfoExt,response: Response) {
	return handle_fetch_response_1(request_info,response)
}
