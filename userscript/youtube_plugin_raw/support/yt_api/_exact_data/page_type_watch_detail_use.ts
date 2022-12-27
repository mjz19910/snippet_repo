import {WatchEndpoint} from "../_abc/w/WatchEndpoint.js";
import {Decay} from "./Decay.js";
import {ExtractParamKey} from "./ExtractParamKey";
import {KVStore} from "./KVStore";
import * as json from "./page_type_watch_detail.json";

export function page_type_watch_detail_use() {
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
	const [
		service_param_0,
		service_param_1,
	]=serviceTrackingParams;
	const service_param_0_t: CsiServiceParams=service_param_0;
	type CsiServiceParams={
		service: "CSI";
		params: KVStore[];
	};
	type GFeedbackParams={
		service: "GFEEDBACK";
		params: KVStore[];
	};
	service_param_0.service;
	const sp_0_params=service_param_0.params;
	type CsiPt=typeof sp_0_params;
	type PvSP<U extends KVStore,T extends string>=ExtractParamKey<[U],T>;
	type Pxg<T extends number>=PvSP<CsiPt[T],CsiPt[T]['key']>;
	type CsiV={
		c?: Pxg<0>["c"];
		cver?: Pxg<1>["cver"];
		yt_li?: Pxg<2>["yt_li"];
		GetWatchNext_rid?: Pxg<3>["GetWatchNext_rid"]; 
	};
	const csi_params_obj: CsiV={};
	for(let i=0;i<sp_0_params.length;i++) {
		let sp_x=sp_0_params[i];
		switch(sp_x.key) {
			case "c": {
				csi_params_obj[sp_x.key]=sp_x.value;
			} break;
			case "cver": {
				csi_params_obj[sp_x.key]=sp_x.value;
			} break;
			case "GetWatchNext_rid": break;
			case "yt_li": csi_params_obj[sp_x.key]=sp_x.value; break;
			default: console.log("new params for",service_param_0.service);
		}
	}
	const service_param_1_t: GFeedbackParams=service_param_1;
	type XX={a: {[U in json_d]: Json[U]};};
	type JR_x={a: {[U in json_d_2]: JResponse[U]};};
	return [
		service_param_0_t,
		service_param_1_t,
		w_endpoint,
		j_res_endpoint,
		class implements XX {a=json;},
		class implements JR_x {a=json.response;},
		json.response.response.contents,
	] as {}[];
}
