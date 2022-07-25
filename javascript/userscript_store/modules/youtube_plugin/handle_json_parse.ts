import {fetch_filter_text_then_data_url} from "./fetch_filter_text_then_data_url"
import {debug} from "./youtube_plugin.user"

export function handle_json_parse<T extends Function, U extends Function>(
	request_info: RequestInfo|URL,
	onfulfilled: T|null|undefined,
	onrejected: U|null|undefined,
	response_text: string) {
	let original_json_parse=JSON.parse
	if(debug.value)
		console.log('JSON.parse = new Proxy()')
	JSON.parse=new Proxy(JSON.parse,{
		apply: function(...proxy_args) {
			if(debug.value)
				console.log('JSON.parse()')
			let obj=Reflect.apply(...proxy_args)
			if(debug.value)
				console.log('request_info.url')
			function get_url_from_request_info(value: RequestInfo|URL) {
				if(typeof value==='string') {
					return value
				} else if(value instanceof URL) {
					return value
				} else if(value.url!==void 0) {
					return value.url
				}
				if(debug.value)
					console.log("handle_json_parse no url",request_info,obj)
				throw new Error("Failed")
			}
			try {
				fetch_filter_text_then_data_url(get_url_from_request_info(request_info),obj)
			} catch {
				console.log("failed to run fetch filter")
			}
			return obj
		}
	})
	let ret
	try {
		if(onfulfilled) {
			ret=onfulfilled(response_text)
		}
	} catch(err) {
		if(onrejected)
			onrejected(err)
	} finally {
		JSON.parse=original_json_parse
	}
	return ret
}
