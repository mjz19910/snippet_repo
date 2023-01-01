async function use_gfeedback() {
	const watch_j_response=(await import("./json/page_type_watch_detail.json")).default.response.response;
	let service_param_1=watch_j_response.responseContext.serviceTrackingParams[1];
	const service_param_1_t: GFeedbackServiceParams=service_param_1;
	service_param_1_t;
}
