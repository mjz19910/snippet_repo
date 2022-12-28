import {PageResponseWatchShorts} from "./PageResponseWatchShorts";
import {ReelWatchEndpoint} from "./ReelWatchEndpoint";
export const use_post_req_uniq_symbol:unique symbol=Symbol("PostTag");
export const web_cmd_api_url:unique symbol=Symbol("ApiUrl");

export type PageTypeShorts<VideoId>={
	pageType: "shorts";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: ReelWatchEndpoint<VideoId>;
	response: PageResponseWatchShorts<VideoId>;
};
