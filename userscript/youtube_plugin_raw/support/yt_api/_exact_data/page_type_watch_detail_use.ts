import * as json from "./page_type_watch_detail.json";
import {use_page_load_response} from "./use_page_load_response";

type Json=typeof json;
type json_d=keyof Json;
export type JResponse=Json['response'];
export type JResponseContent=Json['response']['response'];
export type JResponseContext=JResponseContent['responseContext'];

export function page_type_watch_detail_use() {
	use_page_load_response(json.response);
	type XX={a: {[U in json_d]: Json[U]};};
	return [
		class implements XX {a=json;},
		json.response.response.contents,
	] as {}[];
}
