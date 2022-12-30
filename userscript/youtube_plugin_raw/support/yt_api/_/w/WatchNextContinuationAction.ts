import {WatchNextItem} from "./WatchNextItem";


export type WatchNextContinuationAction={
	targetId: "watch-next-feed";
	continuationItems: WatchNextItem[];
};
