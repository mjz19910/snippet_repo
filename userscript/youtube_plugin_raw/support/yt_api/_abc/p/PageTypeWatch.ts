import {WatchEndpoint} from "../w/WatchEndpoint.js";

export interface PageTypeWatch<T> {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint<T>;
	response: {};
}
