import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {PageResponseWatch} from "./PageResponseWatch";

export interface PageTypeWatch {
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: PageResponseWatch;
	fromHistory: boolean;
	navigationDoneMs: number;
}
