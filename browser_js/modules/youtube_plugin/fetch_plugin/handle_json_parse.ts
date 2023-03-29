import {debug as is_yt_debug_enabled} from "../debug.js";

type FetchInjectInputArgs={
	request: string|URL|Request;
	options: {}|undefined;
};
type G_RS_AllResponses={};
class YtHandlers {
	on_handle_api(request: string|URL|Request,response: Response,response_obj: G_RS_AllResponses) {
		request; response; response_obj;
		throw new Error("Not Implemented");
	}
}
var yt_handlers=new YtHandlers;

function on_json_parse_called(
	proxy_args: Parameters<NonNullable<ProxyHandler<JSON['parse']>["apply"]>>,
	target_args: {request: string|URL|Request,response: Response;}
) {
	if(is_yt_debug_enabled) console.log("JSON.parse()");
	let parsed_response_obj;
	try {parsed_response_obj=json_action_obj.original_action(proxy_args);} catch(e) {
		console.log("target error",e);
		throw e;
	} finally {JSON.parse=json_action_obj.json_parse;}
	if(is_yt_debug_enabled) console.log("request.url");
	json_action_obj.json_response_parsed(target_args,parsed_response_obj);
	return parsed_response_obj;
}
const json_action_obj={
	original_action: (proxy_args: Parameters<NonNullable<ProxyHandler<JSON['parse']>["apply"]>>): G_RS_AllResponses => Reflect.apply(...proxy_args),
	json_parse: JSON.parse,
	json_response_parsed(target_args: {request: string|URL|Request,response: Response;},response_obj: G_RS_AllResponses) {
		const {request,response}=target_args;
		try {
			yt_handlers.on_handle_api(request,response,response_obj);
		} catch(e) {
			console.log("plugin error");
			console.log(e);
		}
	}
};
export function handle_json_parse<T extends Function,U extends Function>(
	{request,options}: FetchInjectInputArgs,
	state: {response: Response;},
	onfulfilled: T,
	on_rejected: U,
	response_text: string,
) {
	const target_args={request,response: state.response};
	if(is_yt_debug_enabled) console.log("handle_json_parse",request,options);
	json_action_obj.json_parse=JSON.parse;
	if(is_yt_debug_enabled) console.log("JSON.parse = new Proxy()");
	const proxy_handler: ProxyHandler<JSON['parse']>={apply: (...proxy_args) => on_json_parse_called(proxy_args,target_args)};
	JSON.parse=new Proxy(JSON.parse,proxy_handler);
	let ret;
	try {if(onfulfilled) {ret=onfulfilled(response_text);} else {ret=response_text;} } catch(err) {
		if(on_rejected) return on_rejected(err);
		throw err;
	} finally {
	}
	return ret;
}
