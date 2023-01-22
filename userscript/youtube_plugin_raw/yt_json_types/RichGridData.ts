type ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
type BrowseFeedContentItem=R$RichItem;
type D__RichGrid=T$AR$Contents<RendererContentItem>&{
	masthead: R$VideoMastheadAdV3;
}|{
	contents: BrowseFeedContentItem[];
	trackingParams: string;
	header: R$FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch"
	reflowOptions: ReflowOptions;
};