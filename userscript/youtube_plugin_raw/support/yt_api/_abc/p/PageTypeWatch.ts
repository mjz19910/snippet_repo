import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {GeneralHistoryState} from "../dfg/GeneralHistoryState";
import {PageResponseWatch} from "./PageResponseWatch";

export interface PageTypeWatch extends GeneralHistoryState {
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: PageResponseWatch;
}
