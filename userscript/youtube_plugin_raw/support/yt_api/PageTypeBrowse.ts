import {PageResponseBrowse} from "./PageResponseBrowse";
import {WatchEndpointH} from "./WatchEndpointH";




export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpointH;
	response: PageResponseBrowse;
}
