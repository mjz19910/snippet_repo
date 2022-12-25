import {CompactVideoRenderer} from "./CompactVideoRenderer";
import {ContinuationItemRenderer} from "./ContinuationItemRenderer";

// WatchNextContinuationAction
export type WatchNextItem={
	compactVideoRenderer: CompactVideoRenderer;
}|{
	continuationItemRenderer: ContinuationItemRenderer;
};
