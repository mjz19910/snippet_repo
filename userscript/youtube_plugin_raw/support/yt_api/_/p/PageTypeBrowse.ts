import {BrowsePageResponse} from "../b/BrowsePageResponse";
import {YtEndpoint} from "../../json/YtEndpoint.js";

export type PageTypeBrowse={
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
};
