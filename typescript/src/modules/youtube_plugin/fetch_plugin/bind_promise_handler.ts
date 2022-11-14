import {handle_json_parse} from "./handle_json_parse.js"
import {debug} from "../debug.js"
import {RequestInfoExt} from "./RequestInfoExt.js";

export function bind_promise_handler<T extends Function, U extends Function>(
	request_info: RequestInfoExt,
	onfulfilled: T|null|undefined,
	onrejected: U|null|undefined) {
	if(debug.value) console.log('handle_json_parse.bind()')
	return (value: string) => handle_json_parse<T, U>(request_info,onfulfilled,onrejected,value)
}
