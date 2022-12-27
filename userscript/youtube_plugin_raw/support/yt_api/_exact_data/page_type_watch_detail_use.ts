import * as json from "./page_type_watch_detail.json";
import {use_watch_page_message_detail} from "./use_watch_page_message_detail";

export function page_type_watch_detail_use() {
	use_watch_page_message_detail(json);
	return json.response.response.contents;
}
