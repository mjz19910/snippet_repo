import {use_response_context} from "./use_response_context";
import {JResponseContent} from "./page_type_watch_detail_use";

export function use_ui_load_response(response: JResponseContent) {
	use_response_context(response.responseContext);
	response.responseContext;
}
