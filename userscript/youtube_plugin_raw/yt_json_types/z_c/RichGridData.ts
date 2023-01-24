type ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
type BrowseFeedContentItem=R_RichItem;
type D_RichGrid=Record<"contents",RendererContentItem[]>&{
	masthead: R_VideoMastheadAdV3;
}|{
	contents: BrowseFeedContentItem[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch"
	reflowOptions: ReflowOptions;
};