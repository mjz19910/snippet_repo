import {YtEndpoint} from "../b/YtEndpoint.js";
import {WatchPageResponse} from "../w/WatchPageResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: YtEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
