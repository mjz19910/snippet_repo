import * as json from "./page_type_watch_detail.json";
export function page_type_watch_detail_use() {
	type Json=typeof json;
	type json_d=keyof Json;
	type JEndpoint=Json['endpoint'];
	type JResponse=Json['response'];
	type json_d_2=keyof JResponse;
	const j_endpoint: JEndpoint=json.endpoint;
	const j_res_endpoint: JEndpoint=json.response.endpoint;
	type XX={a:{[U in json_d]: Json[U]}};
	type JR_x={a:{[U in json_d_2]: JResponse[U]}};
	return [
		j_endpoint,
		j_res_endpoint,
		class implements XX {a=json},
		class implements JR_x {a=json.response},
		json.response.response.contents,
	];
}
