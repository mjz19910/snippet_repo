import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {WatchResponse} from "../w/WatchResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: WatchResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
