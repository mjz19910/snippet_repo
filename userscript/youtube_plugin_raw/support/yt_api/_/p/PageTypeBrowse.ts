import {BrowsePageResponse} from "../b/BrowsePageResponse";
import {YtEndpoint} from "../../yt/YtEndpoint.js";

export type PageTypeBrowse={
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
};
