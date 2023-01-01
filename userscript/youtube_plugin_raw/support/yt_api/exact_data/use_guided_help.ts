async function use_guided_help() {
	const watch_j_response=(await import("./json/page_type_watch_detail.json")).default.response.response;
	let service_param=watch_j_response.responseContext.serviceTrackingParams[2];
	const service_param_t: ServiceParams<"GUIDED_HELP">=service_param;
	service_param_t;
	type GuideHelpParams_=typeof service_param.params;
	type GuideHelpParamsObj=ExtractParamObj<0,GuideHelpParams_>;
	class ActivateCsi implements GuideHelpParamsObj {
		logged_in: ExtractParamObj<0,GuideHelpParams_>["logged_in"];
		constructor(params: GuideHelpParams_) {
			if(params[0].key==="logged_in") {
				this.logged_in=params[0].value;
			} else {
				throw new Error("missing params");
			}
		}
	}
	const guided_help_params_obj: GuideHelpParamsObj=new ActivateCsi(service_param.params);
	guided_help_params_obj;
}
