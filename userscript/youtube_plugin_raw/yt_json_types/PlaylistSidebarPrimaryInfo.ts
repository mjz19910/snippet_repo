type PlaylistSidebarPrimaryInfo={
	thumbnailRenderer: PlaylistVideoThumbnailRenderer;
	title: TextWithRuns;
	stats: TextWithRuns[];
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlaySidePanelRenderer[];
	navigationEndpoint: WatchEndpoint;
	badges: MetadataBadgeRenderer[];
	description: {};
	showMoreText: TextWithRuns;
};
