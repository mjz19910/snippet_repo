import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {GeneralHistoryState} from "../dfg/GeneralHistoryState";
import {PageResponseWatch} from "./PageResponseWatch";

export interface PageTypeWatch<VideoId> extends GeneralHistoryState {
	pageType: "watch";
	endpoint: WatchEndpoint<VideoId>;
	response: PageResponseWatch<VideoId>;
}
