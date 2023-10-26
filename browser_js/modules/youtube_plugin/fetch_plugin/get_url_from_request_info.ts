import {debug} from "../debug.ts";
import {RequestInfoExt} from "./RequestInfoExt.ts";

export function get_url_from_request_info(value: RequestInfoExt) {
	if(typeof value.request_info==='string') {
		return value.request_info;
	} else if(value.request_info instanceof URL) {
		return value.request_info;
	} else if(value.request_info.url!==void 0) {
		return value.request_info.url;
	}
	if(debug.value)
		console.log("handle_json_parse no url",value.request_info);
	throw new Error("Failed");
}
