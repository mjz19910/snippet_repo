import * as json from "./page_type_browse_detail.json";
export function use_page_type_browse_detail() {
	type Json=typeof json;
	type json_d=keyof Json;
	type Je=Json['endpoint']|JR['endpoint'];
	type JR=Json['response'];
	type json_d_2=keyof JR;
	const je_c: Je=json.endpoint;
	const je_c_2: Je=json.response.endpoint;
	type XX={a:{[U in json_d]: Json[U]}};
	type JR_x={a:{[U in json_d_2]: JR[U]}};
	return [
		je_c,
		je_c_2,
		class implements XX {a=json},
		class implements JR_x {a=json.response},
	];
}
