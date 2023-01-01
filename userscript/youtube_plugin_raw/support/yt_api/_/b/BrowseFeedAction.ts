import {BrowseFeedItem} from "./BrowseFeedItem";
import {FeedEntry} from "../../../../yt_json_types/FeedEntry";

export type BrowseFeedAction={
	targetId: `browse-feed${FeedEntry<"what_to_watch">}`;
	continuationItems: BrowseFeedItem[];
};
