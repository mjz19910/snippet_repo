type Todo_D_RichGrid=Record<"contents",RendererContentItem[]>&{
	masthead: R_VideoMastheadAdV3;
};
type D_RichGrid={
	contents: G_RichGridContent[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch";
	reflowOptions: D_ReflowOptions;
}|{
	contents: R_RichItem[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch";
	masthead: R_AdSlot;
	reflowOptions: D_ReflowOptions;
};