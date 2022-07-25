import {any} from "./any"
import {handle_fetch_response_2} from "./handle_fetch_response_2"
import {debug} from "./youtube_plugin.user"

/**
 * @param {RequestInfo} request_info
 * @return {Response}
 */
export function handle_fetch_response_1(request_info: RequestInfo|URL, /** @type {Response} */ response: Response): Response {
	class FakeResponse {
		text(): Promise<string> {
			if(debug)
				console.log('response.text()')
			return handle_fetch_response_2(request_info,response.text())
		}
	}
	let fake_response=new FakeResponse
	return new Proxy(any(fake_response),{
		/**
		 * @param {[Response, keyof Response, Response]} obj
		 */
		get(...[obj,key,_]: [Response,keyof Response,Response]) {
			if(!(key in obj)) {
				return Reflect.get(response,key)
			}
			return obj[key]
		}
	})
}
