import * as json from "./json/page_type_watch_detail.json";
import {use_ui_load_response} from "./use_ui_load_response";

type Json=typeof json;
type JResponse=Json['response'];
export function use_page_load_response(response: JResponse) {
	type json_d_2=keyof JResponse;
	type JR_x={a: {[U in json_d_2]: JResponse[U]};};
	class VV implements JR_x {
		a=response;
	}
	VV;
	const endpoint=response.endpoint;
	console.log('page ep',endpoint);
	use_ui_load_response(response.response);
}
