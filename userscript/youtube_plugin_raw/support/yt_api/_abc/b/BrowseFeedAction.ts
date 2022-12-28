import {BrowseFeedItem} from "./BrowseFeedItem";
import {FeedEntry} from "./FeedEntry";

export type BrowseFeedAction={
	targetId: `browse-feed${FeedEntry<"what_to_watch">}`;
	continuationItems: BrowseFeedItem[];
};
