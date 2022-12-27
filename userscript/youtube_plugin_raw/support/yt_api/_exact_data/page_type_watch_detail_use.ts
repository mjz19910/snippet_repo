import * as json from "./page_type_watch_detail.json";
import {use_page_load_response} from "./use_page_load_response";

type Json=typeof json;
type json_d=keyof Json;

function use_watch_page_message_detail(json: Json) {
	use_page_load_response(json.response);
	type XX={a: {[U in json_d]: Json[U]};};
	return [
		class implements XX {a=json;},
	] as {}[];
}

export function page_type_watch_detail_use() {
	use_watch_page_message_detail(json);
	return json.response.response.contents;
}
