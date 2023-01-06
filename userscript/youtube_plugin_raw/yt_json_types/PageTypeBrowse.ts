import {BrowsePageResponse} from "./BrowsePageResponse.js";
export type PageTypeBrowse={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
