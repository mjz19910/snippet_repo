import {WatchEndpoint} from "../../_/w/WatchEndpoint.js";
import {WatchResponse} from "../../_/w/WatchResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
