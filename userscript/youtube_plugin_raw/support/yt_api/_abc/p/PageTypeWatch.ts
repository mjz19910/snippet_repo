import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {PageResponseWatch} from "./PageResponseWatch";


export interface PageTypeWatch<VideoId> {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpoint<VideoId>;
	response: PageResponseWatch<VideoId>;
}
