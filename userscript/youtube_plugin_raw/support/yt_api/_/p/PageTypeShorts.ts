const use_post_req_uniq_symbol:unique symbol=Symbol("PostTag");
const web_cmd_api_url:unique symbol=Symbol("ApiUrl");

type PageTypeShorts={
	pageType: "shorts";
	endpoint: ReelWatchEndpointData;
	response: {};
	fromHistory: boolean;
	navigationDoneMs: number;
};
