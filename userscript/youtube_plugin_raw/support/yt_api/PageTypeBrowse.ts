import {PageResponseBrowse} from "./PageResponseBrowse";
import {WatchEndpoint} from "./WatchEndpoint";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint;
	response: PageResponseBrowse;
}
