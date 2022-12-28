import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {BrowseResponse} from "../b/BrowseResponse";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: BrowseEndpoint;
	response: BrowseResponse;
}
