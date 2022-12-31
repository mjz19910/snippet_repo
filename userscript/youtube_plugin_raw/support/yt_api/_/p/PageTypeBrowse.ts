import {BrowsePageResponse} from "../b/BrowsePageResponse";
import {YtEndpoint} from "../b/YtEndpoint.js";

export type PageTypeBrowse={
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
};
