import {use_ecatcher} from "./use_ecatcher";
import {use_gfeedback} from "./use_gfeedback";
import {use_guided_help} from "./use_guided_help";
import {use_service_csi} from "./use_service_csi";
import * as json from "./json/page_type_watch_detail.json";
type Json=typeof json;
type JResponseContext=Json["response"]["response"]["responseContext"];
export function use_response_context(context: JResponseContext) {
	const {
		serviceTrackingParams,
	}=context;
	context.serviceTrackingParams;
	for(let i=0;i<serviceTrackingParams.length;i++) {
		const service_param=serviceTrackingParams[i];
		switch(service_param.service) {
			case "CSI": /*0*//*0*/ use_service_csi(service_param); break;
			case "ECATCHER": /*3*//*3*/ use_ecatcher(service_param); break;
			case "GFEEDBACK": /*1*//*1*/ use_gfeedback(service_param); break;
			case "GUIDED_HELP": /*2*//*2*/ use_guided_help(service_param); break;
		}
	}
}
