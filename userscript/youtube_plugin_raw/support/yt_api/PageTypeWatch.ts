import {WatchEndpointH} from "./WatchEndpointH";




export interface PageTypeWatch {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpointH;
	response: {};
}
