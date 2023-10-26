import {debug} from "../debug.js"
import {handle_fetch_response_2} from "./handle_fetch_response_2.ts"
import {RequestInfoExt} from "./RequestInfoExt.ts";

export function handle_fetch_response_1(request_info: RequestInfoExt,response: Response): Response {
	let overridden_props = ['text']
	class FakeResponse extends Response {
		override text(): Promise<string> {
			if(debug.value) console.log('response.text()')
			return handle_fetch_response_2(request_info,response.text())
		}
	}
	let fake_response=new FakeResponse
	return new Proxy(fake_response,{
		get(...[obj,key,_]: [Response,keyof Response,Response]) {
			if(overridden_props.includes(key)) {
				return obj[key]
			}
			return Reflect.get(response,key)
		}
	})
}
