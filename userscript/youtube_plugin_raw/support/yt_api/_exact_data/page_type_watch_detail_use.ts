import * as json from "./page_type_watch_detail.json";
import {use_ecatcher} from "./use_ecatcher";
import {use_gfeedback} from "./use_gfeedback";
import {use_guided_help} from "./use_guided_help";
import {use_page_load_response} from "./use_page_load_response";
import {use_service_csi} from "./use_service_csi";

type Json=typeof json;
type json_d=keyof Json;
export type JResponse=Json['response'];
type JResponseContent=Json['response']['response'];
type JResponseContext=JResponseContent['responseContext'];
export function use_ui_load_response(response: JResponseContent) {
	use_response_context(response.responseContext);
	response.responseContext;
}
function use_response_context(context: JResponseContext) {
	const {
		serviceTrackingParams,
	}=context;
	context.serviceTrackingParams;
	for(let i=0;i<serviceTrackingParams.length;i++) {
		const service_param=serviceTrackingParams[i];
		switch(service_param.service) {
			case "CSI": /*0*/use_service_csi(service_param); break;
			case "ECATCHER": /*3*/use_ecatcher(service_param); break;
			case "GFEEDBACK": /*1*/use_gfeedback(service_param); break;
			case "GUIDED_HELP": /*2*/use_guided_help(service_param); break;
		}
	}
}
export function page_type_watch_detail_use() {
	use_page_load_response(json.response);
	type XX={a: {[U in json_d]: Json[U]};};
	return [
		class implements XX {a=json;},
		json.response.response.contents,
	] as {}[];
}
