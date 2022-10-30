import {handle_fetch_response_1} from "./handle_fetch_response_1"

export function fetch_promise_handler(request_info: RequestInfo|URL,response: Response) {
	return handle_fetch_response_1(request_info,response)
}
