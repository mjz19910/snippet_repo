type BrowseFeedAction={
	targetId: `browse-feed${FeedEntry<"what_to_watch">}`;
	continuationItems: BrowseFeedItem[];
};
type YtTargetIdType=[
	AppendContinuationItemsAction['targetId'],
][number];