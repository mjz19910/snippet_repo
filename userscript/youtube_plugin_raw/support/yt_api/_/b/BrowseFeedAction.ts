import {BrowseFeedItem} from "./BrowseFeedItem";
import {FeedEntry} from "../f/FeedEntry";

export type BrowseFeedAction={
	targetId: `browse-feed${FeedEntry<"what_to_watch">}`;
	continuationItems: BrowseFeedItem[];
};
