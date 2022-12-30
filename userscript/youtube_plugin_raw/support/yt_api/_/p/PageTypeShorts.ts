import {ShortsPageResponse} from "../s/ShortsPageResponse.js";
import {ReelWatchEndpointData} from "../r/ReelWatchEndpointData";
export const use_post_req_uniq_symbol:unique symbol=Symbol("PostTag");
export const web_cmd_api_url:unique symbol=Symbol("ApiUrl");

export type PageTypeShorts={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpointData;
	response: ShortsPageResponse;
};
