import {WatchEndpoint} from "../_abc/w/WatchEndpoint.js";
import {ExtractParamKey} from "./ExtractParamKey";
import {KVStore} from "./KVStore";
import * as json from "./page_type_watch_detail.json";

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

export function page_type_watch_detail_use() {
	const xx:JResponseContent=json.response.response;
	for(let i=0;i<serviceTrackingParams.length;i++) {
		const service_param=serviceTrackingParams[i];
		switch(service_param.service) {
			case "CSI": use_service_csi(service_param); break;
			case "ECATCHER": break;
			case "GFEEDBACK": break;
			case "GUIDED_HELP": break;
		}
	}
	type CsiServiceParams={
		service: "CSI";
		params: KVStore[];
	};
	function use_service_csi(service_param: typeof serviceTrackingParams[0]) {
		const service_param_t: CsiServiceParams=service_param;
		service_param_t;
		service_param.service;
		const sp_0_params=service_param.params;
		type CsiPt=typeof sp_0_params;
		type Pxg<T extends number>=PvSP<CsiPt[T],CsiPt[T]['key']>;
		type CsiV={
			c: Pxg<0>["c"];
			cver: Pxg<1>["cver"];
			yt_li: Pxg<2>["yt_li"];
			GetWatchNext_rid: Pxg<3>["GetWatchNext_rid"];
		};
		class ActivateCsi implements CsiV {
			c!: Pxg<0>["c"];
			cver!: Pxg<1>["cver"];
			yt_li!: Pxg<2>["yt_li"];
			GetWatchNext_rid!: Pxg<3>["GetWatchNext_rid"];
			constructor(sp_0_params: CsiPt) {
				for(let i=0;i<sp_0_params.length;i++) {
					let sp_x=sp_0_params[i];
					switch(sp_x.key) {
						case "c": {
							this[sp_x.key]=sp_x.value;
						} break;
						case "cver": {
							this[sp_x.key]=sp_x.value;
						} break;
						case "GetWatchNext_rid": this[sp_x.key]=sp_x.value; break;
						case "yt_li": this[sp_x.key]=sp_x.value; break;
						default: console.log("new params for",service_param.service);
					}
				}
			}
		}
		const csi_params_obj: CsiV=new ActivateCsi(sp_0_params);
		csi_params_obj;
	}
	type GFeedbackParams={
		service: "GFEEDBACK";
		params: KVStore[];
	};
	function use_gfeedback(service_param_1: GFeedbackParams) {
		const service_param_1_t: GFeedbackParams=service_param_1;
		service_param_1_t;

	}
	type PvSP<U extends KVStore,T extends string>=ExtractParamKey<[U],T>;
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
