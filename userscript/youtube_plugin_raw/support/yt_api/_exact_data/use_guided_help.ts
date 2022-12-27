import {ServiceParams} from "./ServiceParams";
import * as json from "./json/page_type_watch_detail.json";
import {ExtractSingleParamKey} from "./ExtractSingleParamKey.js";
type Json=typeof json;

export function use_guided_help(service_param: Json['response']['response']['responseContext']['serviceTrackingParams'][2]) {
	const service_param_t: ServiceParams<"GUIDED_HELP">=service_param;
	service_param_t;
	type GuideHelpParams_=typeof service_param.params;
	type Pxg<T extends number,U extends any[]>=ExtractSingleParamKey<U[T],U[T]['key']>;
	type GuideHelpParamsObj=Pxg<0,GuideHelpParams_>;
	class ActivateCsi implements GuideHelpParamsObj {
		logged_in: Pxg<0,GuideHelpParams_>["logged_in"];
		constructor(params: GuideHelpParams_) {
			if(params[0].key==="logged_in") {
				this.logged_in=params[0].value;
			} else {
				throw new Error("missing params");
			}
		}
	}
	const csi_params_obj: GuideHelpParamsObj=new ActivateCsi(service_param.params);
	csi_params_obj;
}
