import {WatchNextItem} from "./WatchNextItem";


export interface WatchNextContinuationAction {
	targetId: "watch-next-feed";
	continuationItems: WatchNextItem[];
}
