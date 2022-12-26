import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {PageResponseBrowse} from "./PageResponseBrowse";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: BrowseEndpoint;
	response: PageResponseBrowse;
}
