import {WatchEndpoint} from "./WatchEndpoint";




export interface PageTypeWatch {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint;
	response: {};
}
