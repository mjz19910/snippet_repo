import {handle_json_parse} from "./handle_json_parse.js";
import {debug} from "../debug.js";
import {RequestInfoExt} from "./RequestInfoExt.js";

export function bind_promise_handler<T extends Function,U extends Function>(
	{request_info: request,init: options,response}: RequestInfoExt,
	onfulfilled: T,
	onrejected: U
) {
	if(debug.value) console.log('handle_json_parse.bind()');
	return (value: string) => handle_json_parse<T,U>({request,options},{response},onfulfilled,onrejected,value);
}
