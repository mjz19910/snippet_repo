import {WatchNextItem} from "./WatchNextItem";

interface WatchNextContinuationAction {
	targetId: "watch-next-feed";
	continuationItems: WatchNextItem[];
}
