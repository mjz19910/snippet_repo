import {ExtractSingleParamKey} from "./ExtractSingleParamKey";
import {CsiServiceParams} from "../_/a/CsiServiceParams";
import {watch_j_response} from "./watch_j_response.js";
export const watch_serviceTrackingParams=watch_j_response.responseContext.serviceTrackingParams;
export function use_service_csi(service_param: typeof watch_serviceTrackingParams[0]) {
	const service_param_t: CsiServiceParams=service_param;
	service_param_t;
	service_param.service;
	const sp_0_params=service_param.params;
	type CsiPt=typeof sp_0_params;
	type Pxg<T extends number>=ExtractSingleParamKey<CsiPt[T],CsiPt[T]["key"]>;
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
					case "c": this[sp_x.key]=sp_x.value; break;
					case "cver": this[sp_x.key]=sp_x.value; break;
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
