import {handle_fetch_response_2} from "./handle_fetch_response_2"
import {debug} from "./youtube_plugin.user"

export function handle_fetch_response_1(request_info: RequestInfo|URL,response: Response): Response {
	let overridden_props = ['text']
	class FakeResponse extends Response {
		text(): Promise<string> {
			if(debug.value) console.log('response.text()')
			return handle_fetch_response_2(request_info,response.text())
		}
	}
	let fake_response=new FakeResponse
	return new Proxy(fake_response,{
		/**
		 * @param {[Response, keyof Response, Response]} obj
		 */
		get(...[obj,key,_]: [Response,keyof Response,Response]) {
			if(overridden_props.includes(key)) {
				return obj[key]
			}
			return Reflect.get(response,key)
		}
	})
}
