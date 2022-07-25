import {handle_json_parse} from "./handle_json_parse"
import {debug} from "./youtube_plugin.user"

export function bind_promise_handler<T,TResult2>(
	request_info: RequestInfo|URL,
	onfulfilled: ((value: T) => T|PromiseLike<T>)|null|undefined,
	onrejected: ((reason: any) => TResult2|PromiseLike<TResult2>)|null|undefined) {
	if(debug)
		console.log('handle_json_parse.bind()')
	return (value: string) => handle_json_parse(request_info,onfulfilled,onrejected,value)
}
