import {WatchEndpoint} from "../../_/w/WatchEndpoint.js";
import {WatchPageResponse} from "../w/WatchPageResponse";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
}
