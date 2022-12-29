import {BrowseEndpoint} from "../../_/b/BrowseEndpoint.js";
import {BrowseResponse} from "../../_/b/BrowseResponse";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: BrowseEndpoint;
	response: BrowseResponse;
}
