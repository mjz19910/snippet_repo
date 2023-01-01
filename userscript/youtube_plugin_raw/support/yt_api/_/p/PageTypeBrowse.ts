import {BrowsePageResponse} from "../b/BrowsePageResponse";
import {YtEndpoint} from "../../../../yt_json_types/YtEndpoint.js";

export type PageTypeBrowse={
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
};
