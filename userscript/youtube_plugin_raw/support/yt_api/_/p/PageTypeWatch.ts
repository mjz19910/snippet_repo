import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {WatchPageResponse} from "../w/WatchPageResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: YtEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
