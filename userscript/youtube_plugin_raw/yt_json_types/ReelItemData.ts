type ReelItemData={
	videoId: YtVideoId;
	headline: TextWithRuns;
	thumbnail: Thumbnail;
	viewCountText: TextWithRuns;
	navigationEndpoint: E$ReelWatchEndpoint;
	menu: MenuRenderer;
	trackingParams: string;
	accessibility:Accessibility;
	style: "REEL_ITEM_STYLE_AVATAR_CIRCLE";
	videoType: "REEL_VIDEO_TYPE_VIDEO";
	loggingDirectives: LoggingDirectives;
};