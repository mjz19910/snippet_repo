import * as json from "./json/page_type_watch_detail.json";
import {use_response_context} from "./use_response_context";

type Json=typeof json;
type JResponseContent=Json['response']['response'];
export function use_ui_load_response(response: JResponseContent) {
	use_response_context(response.responseContext);
	response.responseContext;
}
