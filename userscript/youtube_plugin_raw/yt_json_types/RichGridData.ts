type ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
type BrowseFeedContentItem=RichItemRenderer;
type RichGrid=T$AR$Contents<RendererContentItem>&{
	masthead: VideoMastheadAdV3Renderer;
}|{
	contents: BrowseFeedContentItem[];
	trackingParams: string;
	header: FeedFilterChipBarRenderer;
	targetId: "browse-feedFEwhat_to_watch"
	reflowOptions: ReflowOptions;
};