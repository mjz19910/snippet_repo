type ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
type BrowseFeedContentItem=R_RichItem;
type D__RichGrid=T$AR_Contents<RendererContentItem>&{
	masthead: R_VideoMastheadAdV3;
}|{
	contents: BrowseFeedContentItem[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch"
	reflowOptions: ReflowOptions;
};