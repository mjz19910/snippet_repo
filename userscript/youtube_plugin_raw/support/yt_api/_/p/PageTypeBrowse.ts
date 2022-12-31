import {BrowseEndpoint} from "../../_/b/BrowseEndpoint.js";
import {BrowsePageResponse} from "../b/BrowsePageResponse";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: BrowseEndpoint;
	response: BrowsePageResponse;
}
