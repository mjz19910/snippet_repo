import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {PageResponseBrowse} from "./PageResponseBrowse";




export interface PageTypeBrowse<T> {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: BrowseEndpoint<T>;
	response: PageResponseBrowse;
}
