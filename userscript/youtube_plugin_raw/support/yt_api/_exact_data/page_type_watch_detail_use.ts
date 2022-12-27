import {WatchEndpoint} from "../_abc/w/WatchEndpoint.js";
import * as json from "./page_type_watch_detail.json";
import {ServiceParams} from "./ServiceParams";
import {use_service_csi} from "./use_service_csi";

type Json=typeof json;
type json_d=keyof Json;
type JEndpoint=Json['endpoint'];
type JResponse=Json['response'];
type JResponseContent=Json['response']['response'];
type json_d_2=keyof JResponse;
const j_endpoint: JEndpoint=json.endpoint;
const j_res_endpoint: JEndpoint=json.response.endpoint;
const w_endpoint: WatchEndpoint<JEndpoint['watchEndpoint']['videoId']>=j_endpoint;
const j_response=json.response.response;
const {
	responseContext,
}=j_response;
const {
	serviceTrackingParams,
}=responseContext;
export {serviceTrackingParams};

export function page_type_watch_detail_use() {
	const xx:JResponseContent=json.response.response;
	for(let i=0;i<serviceTrackingParams.length;i++) {
		const service_param=serviceTrackingParams[i];
		switch(service_param.service) {
			case "CSI": /*0*/use_service_csi(service_param); break;
			case "ECATCHER": /*3*/use_ecatcher(service_param); break;
			case "GFEEDBACK": /*1*/use_gfeedback(service_param); break;
			case "GUIDED_HELP": /*2*/use_guided_help(service_param); break;
		}
	}
	type XX={a: {[U in json_d]: Json[U]};};
	type JR_x={a: {[U in json_d_2]: JResponse[U]};};
	return [
		xx,
		w_endpoint,
		j_res_endpoint,
		class implements XX {a=json;},
		class implements JR_x {a=json.response;},
		json.response.response.contents,
	] as {}[];
}
function use_ecatcher(service_param: typeof serviceTrackingParams[3]) {
	const service_param_t: ServiceParams<"ECATCHER">=service_param;
	service_param_t;
}

function use_guided_help(service_param: typeof serviceTrackingParams[2]) {
	const service_param_t: ServiceParams<"GUIDED_HELP">=service_param;
	service_param_t;
}
function use_gfeedback(service_param_1: typeof serviceTrackingParams[1]) {
	const service_param_1_t: ServiceParams<"GFEEDBACK">=service_param_1;
	service_param_1_t;
}