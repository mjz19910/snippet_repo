import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {PageTypeBrowse} from "./PageTypeBrowse.js";

export interface PageTypeWatch<T> {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint<T>;
	response: {};
}

export type YTNavigateFinishEventDetail=PageTypeWatch<string>|PageTypeBrowse;