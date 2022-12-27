import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {PageResponseWatch} from "./PageResponseWatch";


export interface PageTypeWatch<T> {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint<T>;
	response: PageResponseWatch;
}
