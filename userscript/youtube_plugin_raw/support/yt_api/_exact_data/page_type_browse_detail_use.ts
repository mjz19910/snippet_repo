import {BrowseEndpoint} from "../_abc/b/BrowseEndpoint.js";
import * as json from "./page_type_browse_detail.json";
export function use_page_type_browse_detail() {
	type Json=typeof json;
	type json_d=keyof Json;
	type Je=Json['endpoint']|JR['endpoint'];
	type JR=Json['response'];
	type json_d_2=keyof JR;
	const je_c: Je=json.endpoint;
	const je_c_2: Je=json.response.endpoint;
	const browse_ep: BrowseEndpoint=je_c;
	type XX={a:{[U in json_d]: Json[U]}};
	type JR_x={a:{[U in json_d_2]: JR[U]}};
	return [
		browse_ep,
		je_c,
		je_c_2,
		class implements XX {a=json},
		class implements JR_x {a=json.response},
		json.response.response.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents[0].richItemRenderer
	];
}
