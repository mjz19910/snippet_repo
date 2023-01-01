import {YtEndpoint} from "../../../../yt_json_types/YtEndpoint.js";
import {WatchPageResponse} from "../w/WatchPageResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: YtEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
